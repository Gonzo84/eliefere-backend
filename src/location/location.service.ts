import {
  BadRequestException, ConflictException, Injectable, Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { NearestPartnersRequest, UpdateLocationRequest, INearestPartnersUntransformed } from '../contract';
import { Location } from '../entities/location/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
  }

  // eslint-disable-next-line max-len
  public async getNearestPartners(nearest: NearestPartnersRequest): Promise<INearestPartnersUntransformed[]> {
    try {
      return await this.locationRepository.createQueryBuilder('locations')
        .innerJoinAndSelect('locations.partner', 'partner')
        .where('ST_DWithin(location, ST_MakePoint(:lat,:long)::geography, :dist)', {
          lat: nearest.location[0],
          long: nearest.location[1],
          dist: nearest.distance,
        })
        .orderBy(`location <-> ST_MakePoint(${nearest.location[0]},${nearest.location[1]})::geography`)
        .getMany();
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updateLocation(
    id: number,
    updateLocationRequest: UpdateLocationRequest,
  ): Promise<void> {
    const newLocation = new Location();
    newLocation.location = updateLocationRequest.location;
    await LocationService.validateLocation(newLocation);
    try {
      await this.locationRepository.update(id, newLocation);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  private static async validateLocation(location: Location): Promise<void> {
    const errors = await validate(location, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
