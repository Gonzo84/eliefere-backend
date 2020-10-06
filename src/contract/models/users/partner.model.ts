import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { ServiceClassModel } from './service-class.model';
import { LocationEntityModel } from '../location-entity.model';

export class PartnerModel extends BaseModel {
  @ApiProperty()
  location?: LocationEntityModel;

  @ApiProperty()
  service_class?: ServiceClassModel[];
}
