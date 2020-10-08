import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import {
  PartnerEntity,
  ServiceClassEntity,
} from '../entities';
import {
  NearestPartnersRequest, SignupRequest, INearestPartnersUntransformed, ServiceClassRequest,
} from '../contract';
import { toPartnerEntity } from './partner.mapper';
import { LocationService } from '../location/location.service';
import { ServiceClassService } from './service-class.service';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
    private readonly locationService: LocationService,
    private serviceClassService: ServiceClassService,
  ) {
  }

  // eslint-disable-next-line max-len
  public async getNearestPartners(nearest: NearestPartnersRequest): Promise<INearestPartnersUntransformed[]> {
    return this.locationService.getNearestPartners(nearest);
  }

  public async getPartnerEntityById(id: number): Promise<PartnerEntity> {
    return this.partnerRepository.findOne(id);
  }

  public async getPartnerEntityByUsername(username: string): Promise<PartnerEntity> {
    const normalizedUsername = username.toLowerCase();
    return this.partnerRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getPartnerEntityByEmail(email: string): Promise<PartnerEntity> {
    const normalizedEmail = email.toLowerCase();
    return this.partnerRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getPartnerEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<PartnerEntity> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.partnerRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });
  }

  public async createPartner(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<PartnerEntity> {
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

  public async updatePartner(partnerEntity: PartnerEntity): Promise<void> {
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

  public async postServiceClass(serviceClassRequest: ServiceClassRequest): Promise<ServiceClassEntity> {
    const partnerEntity = await this.getPartnerEntityById(serviceClassRequest.partnerId);
    return this.serviceClassService.saveSerivceClass(serviceClassRequest, partnerEntity);
  }

  private static async validatePartner(partner: PartnerEntity): Promise<void> {
    const errors = await validate(partner, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
