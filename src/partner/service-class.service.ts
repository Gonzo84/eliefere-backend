import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { isEmpty } from 'lodash';
import {
  PartnerEntity, ServiceClassEntity, VehicleDetailsEntity, VehiclePhotoEntity,
} from '../entities';
import { ServiceClassRequest } from '../contract';
import { VehiclePhotosModel } from '../contract/models/users/vehicle-photos.model';

@Injectable()
export class ServiceClassService {
  constructor(
    @InjectRepository(ServiceClassEntity)
    private readonly scRepository: Repository<ServiceClassEntity>,
    @InjectRepository(VehicleDetailsEntity)
    private readonly vdRepository: Repository<VehicleDetailsEntity>,
    @InjectRepository(VehiclePhotoEntity)
    private readonly vpRepository: Repository<VehiclePhotoEntity>,
  ) {
  }

  public async saveSerivceClass(
    serviceClassRequest: ServiceClassRequest,
    partnerEntity: PartnerEntity,
  ): Promise<ServiceClassEntity> {
    const serviceClass = new ServiceClassEntity();
    serviceClass.type_of_service = serviceClassRequest.type_of_service;
    serviceClass.partner = partnerEntity;
    ServiceClassService.validateEntity(serviceClass);
    try {
      const newSC = await this.scRepository.save(serviceClass);
      if (!isEmpty(serviceClassRequest.details)) {
        const newVD = await this.saveVehicleDetails(serviceClassRequest, newSC);
        // eslint-disable-next-line max-len
        if (!isEmpty(serviceClassRequest.details.photos) && serviceClassRequest.details.photos.length > 0) {
          serviceClassRequest.details.photos.forEach((photo) => {
            this.saveVehiclePhoto(photo, newVD);
          });
        }
      }
      return newSC;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  // eslint-disable-next-line max-len
  private async saveVehicleDetails(serviceClassRequest: Partial<ServiceClassRequest>, newSC: ServiceClassEntity): Promise<VehicleDetailsEntity> {
    const vehicleDetails = new VehicleDetailsEntity();
    vehicleDetails.verified = serviceClassRequest.details.verified;
    vehicleDetails.service = newSC;
    ServiceClassService.validateEntity(vehicleDetails);
    try {
      return await this.vdRepository.save(vehicleDetails);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  private async saveVehiclePhoto(
    photo: VehiclePhotosModel,
    newVD: VehicleDetailsEntity,
  ): Promise<void> {
    const photoEntity = new VehiclePhotoEntity();
    photoEntity.url = photo.url;
    photoEntity.details = newVD;
    ServiceClassService.validateEntity(photoEntity);
    try {
      await this.vpRepository.save(photoEntity);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  private static async validateEntity(
    entity: ServiceClassEntity | VehicleDetailsEntity | VehiclePhotoEntity,
  ): Promise<void> {
    const errors = await validate(entity, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
