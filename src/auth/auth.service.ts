import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  CheckEmailRequest,
  CheckEmailResponse,
  CheckUsernameRequest,
  CheckUsernameResponse,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
} from '../contract';
import { ClientService } from '../client/client.service';
import { PartnerService } from '../partner/partner.service';
import { JwtPayload } from '../contract/interfaces/jwt-payload.interface';
import { Client } from '../entities/users/client.entity';
import { EmailVerification } from '../entities/auth/email-verification.entity';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { EmailChange } from '../entities/auth/email-change.entity';
import { PasswordReset } from '../entities/auth/password-reset.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    @InjectRepository(EmailChange)
    private readonly emailChangeRepository: Repository<EmailChange>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly clientService: ClientService,
    private readonly partnerService: PartnerService,
    private readonly jwtService: JwtService,
  ) {
  }

  async signup(signupRequest: SignupRequest): Promise<void> {
    const hash = await argon2.hash(signupRequest.password);
    const createdUser = signupRequest.role === 'partner' ? await this.partnerService.createPartner(
      signupRequest,
      hash,
    ) : await this.clientService.createClient(
      signupRequest,
      hash,
    );
    const token = nanoid();

    const emailVerification = new EmailVerification();
    emailVerification.token = token;
    emailVerification.userId = createdUser.id;
    // valid for 2 days
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    emailVerification.validUntil = twoDaysLater;

    try {
      await this.emailVerificationRepository.insert(emailVerification);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new InternalServerErrorException(err);
    }

    await MailSenderService.sendVerifyEmailMail(
      signupRequest.firstName,
      signupRequest.email,
      token,
    );
  }

  async resendVerificationMail(
    name: string,
    email: string,
    userId: number,
  ): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOne({
      where: { userId },
    });

    if (emailVerification === null || emailVerification === undefined) {
      Logger.log(
        `User with id ${userId} called resend verification without a valid email verification`,
      );
      throw new NotFoundException();
    }

    // update validUntil to 2 days later
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    emailVerification.validUntil = twoDaysLater;

    await this.emailVerificationRepository.update(
      emailVerification.token,
      emailVerification,
    );

    await MailSenderService.sendVerifyEmailMail(
      name,
      email,
      emailVerification.token,
    );
  }

  async verifyEmail(token: string): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOne(
      token,
    );

    if (emailVerification && emailVerification.validUntil > new Date()) {
      const clientEntity = await this.clientService.getClientEntityById(
        emailVerification.userId,
      );
      clientEntity.emailVerified = true;
      await this.clientService.updateClient(clientEntity);
      await this.emailVerificationRepository.delete(emailVerification);
    } else {
      Logger.log(`Verify email called with invalid email token ${token}`);
      throw new NotFoundException();
    }
  }

  async sendChangeEmailMail(
    changeEmailRequest: ChangeEmailRequest,
    userId: number,
    name: string,
    oldEmail: string,
  ): Promise<void> {
    // Check whether email is in use
    const clientEntity = await this.clientService.getClientEntityByUsername(
      changeEmailRequest.newEmail,
    );
    if (clientEntity !== undefined) {
      Logger.log(
        `User with id ${userId} tried to change its email to already used ${
          changeEmailRequest.newEmail
        }`,
      );
      throw new ConflictException();
    }

    // Invalidate old token if exists
    const oldEmailChangeEntity = await this.emailChangeRepository.findOne({
      userId,
    });
    if (oldEmailChangeEntity !== undefined) {
      await this.emailChangeRepository.delete(oldEmailChangeEntity);
      Logger.log(
        `Email change token ${oldEmailChangeEntity.token} is invalidated`,
      );
    }

    const token = nanoid();
    const emailChange = new EmailChange();
    emailChange.token = token;
    emailChange.userId = userId;
    // valid for 2 days
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    emailChange.validUntil = twoDaysLater;
    try {
      await this.emailChangeRepository.insert(emailChange);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new InternalServerErrorException(err);
    }

    await MailSenderService.sendChangeEmailMail(name, oldEmail, token);
  }

  async changeEmail(token: string): Promise<void> {
    const emailChange = await this.emailChangeRepository.findOne(token);
    if (emailChange && emailChange.validUntil > new Date()) {
      const clientEntity = await this.clientService.getClientEntityById(
        emailChange.userId,
      );
      clientEntity.email = emailChange.newEmail;
      await this.clientService.updateClient(clientEntity);
      await this.emailChangeRepository.delete(emailChange);
    } else {
      Logger.log(`Invalid email change token ${token} is rejected.`);
      throw new NotFoundException();
    }
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    const clientEntity = await this.clientService.getClientEntityByUsername(email);
    if (clientEntity === null || clientEntity === undefined) {
      throw new NotFoundException();
    }

    const userId = clientEntity.id;
    // Invalidate old token if exists
    const oldResetPasswordEntity = await this.passwordResetRepository.findOne({
      userId,
    });
    if (oldResetPasswordEntity !== undefined) {
      await this.passwordResetRepository.delete(oldResetPasswordEntity);
      Logger.log(
        `Password reset token ${oldResetPasswordEntity.token} is invalidated`,
      );
    }
    const token = nanoid();
    const passwordReset = new PasswordReset();
    passwordReset.token = token;
    passwordReset.userId = userId;
    // valid for 2 days
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    passwordReset.validUntil = twoDaysLater;
    try {
      await this.emailChangeRepository.insert(passwordReset);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new InternalServerErrorException(err);
    }

    await MailSenderService.sendResetPasswordMail(
      clientEntity.firstName,
      clientEntity.email,
      token,
    );
  }

  async resetPassword(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    const passwordResetEntity = await this.passwordResetRepository.findOne(
      resetPasswordRequest.token,
    );

    if (passwordResetEntity && passwordResetEntity.validUntil > new Date()) {
      await this.clientService.updatePassword(
        passwordResetEntity.userId,
        await argon2.hash(resetPasswordRequest.newPassword),
      );
      await this.passwordResetRepository.delete(passwordResetEntity);
    } else {
      Logger.log(
        `Invalid reset password token ${
          resetPasswordRequest.newPassword
        } is rejected`,
      );
      throw new NotFoundException();
    }
  }

  async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    userId: number,
    name: string,
    email: string,
  ): Promise<void> {
    await this.clientService.updatePassword(
      userId,
      await argon2.hash(changePasswordRequest.newPassword),
    );

    await MailSenderService.sendPasswordChangeInfoMail(name, email);
  }

  async validateClient(payload: JwtPayload): Promise<Client> {
    const clientEntity = await this.clientService.getClientEntityById(payload.id);
    if (
      clientEntity !== undefined
      && clientEntity.email === payload.email
      && clientEntity.username === payload.username
    ) {
      return clientEntity;
    }
    throw new UnauthorizedException();
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const clientEntity = await this.clientService.getClientEntityByUsernameOrEmail(
      loginRequest.identifier,
    );
    if (
      clientEntity === null || clientEntity === undefined
      || !argon2.verify(clientEntity.passwordHash, loginRequest.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: clientEntity.id,
      email: clientEntity.email,
      username: clientEntity.username,
    };

    return this.jwtService.signAsync(payload);
  }

  async checkUsername(
    checkUsernameRequest: CheckUsernameRequest,
  ): Promise<CheckUsernameResponse> {
    const clientEntity = await this.clientService.getClientEntityByUsername(
      checkUsernameRequest.username,
    );
    return new CheckUsernameResponse(clientEntity === null || clientEntity === undefined);
  }

  async checkEmail(
    checkEmailRequest: CheckEmailRequest,
  ): Promise<CheckEmailResponse> {
    const clientEntity = await this.clientService.getClientEntityByEmail(
      checkEmailRequest.email,
    );
    return new CheckEmailResponse(clientEntity === null || clientEntity === undefined);
  }
}
