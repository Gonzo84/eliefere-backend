import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { Partner } from '../entities/users/partner.entity';
import { SignupRequest } from '../contract';
import { toPartnerEntity } from './partner.mapper';
import { LocationService } from '../location/location.service';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    private readonly locationService: LocationService,
  ) {
  }

  public async getPartnerEntityById(id: number): Promise<Partner> {
    return this.partnerRepository.findOne(id);
  }

  public async getPartnerEntityByUsername(username: string): Promise<Partner> {
    const normalizedUsername = username.toLowerCase();
    return this.partnerRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getPartnerEntityByEmail(email: string): Promise<Partner> {
    const normalizedEmail = email.toLowerCase();
    return this.partnerRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getPartnerEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<Partner> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.partnerRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });
  }

  public async createPartner(
    signupRequest:SignupRequest,
    passwordHash: string,
  ): Promise<Partner> {
    const newPartner = toPartnerEntity(signupRequest, passwordHash);
    try {
      await this.partnerRepository.save(newPartner);
      return newPartner;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updatePassword(
    partnerId: number,
    passwordHash: string,
  ): Promise<void> {
    const partnerEntity = await this.partnerRepository.findOne(partnerId);
    if (partnerEntity === null || partnerEntity === undefined) {
      Logger.warn(
        `Password change of non-existent account with id ${partnerId} is rejected.`,
      );
      throw new NotFoundException();
    }

    partnerEntity.passwordHash = passwordHash;
    await this.partnerRepository.update(partnerEntity.id, partnerEntity);
  }

  public async updatePartner(partnerEntity: Partner): Promise<void> {
    await PartnerService.validatePartner(partnerEntity);
    const { location } = { ...partnerEntity };
    // eslint-disable-next-line no-param-reassign
    delete partnerEntity.location;
    try {
      await this.partnerRepository.update(partnerEntity.id, { ...partnerEntity });
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
    // needed to update location separately because of this issue: https://github.com/typeorm/typeorm/issues/4122
    try {
      await this.locationService.updateLocation(partnerEntity.id, location);
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
  }

  private static async validatePartner(partner: Partner): Promise<void> {
    const errors = await validate(partner, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
