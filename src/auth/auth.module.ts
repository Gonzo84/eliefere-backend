import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ClientModule } from '../client/client.module';
import { AuthController } from './auth.controller';
import {
  ClientEntity, EmailVerificationEntity, EmailChangeEntity, PasswordResetEntity,
} from '../entities';
import { JwtStrategy } from './jwt.strategy';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { configService } from '../config/config.service';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      EmailVerificationEntity,
      EmailChangeEntity,
      PasswordResetEntity,
    ]),
    ClientModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getConf().jwt.secretOrKey,
      signOptions: {
        expiresIn: configService.getConf().jwt.expiresIn,
      },
    }),
    MailSenderModule,
    PartnerModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}
