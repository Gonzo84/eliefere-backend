import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PartnerService } from './partner.service';
import {
  PartnerEntity,
  ServiceClassEntity,
  VehicleDetailsEntity,
  VehiclePhotoEntity,
} from '../entities';
import { PartnerController } from './partner.controller';
import { LocationModule } from '../location/location.module';
import { ServiceClassService } from './service-class.service';

@Module({
  providers: [PartnerService, ServiceClassService],
  imports: [
    TypeOrmModule.forFeature(
      [PartnerEntity, ServiceClassEntity, VehicleDetailsEntity, VehiclePhotoEntity],
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LocationModule,
  ],
  exports: [PartnerService],
  controllers: [PartnerController],

})
export class PartnerModule {

}
