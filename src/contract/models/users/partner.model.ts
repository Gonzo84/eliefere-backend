import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { ServiceClassModel } from './service-class.model';
// eslint-disable-next-line import/no-cycle
import { LocationEntityModel } from '../location-entity.model';

export class PartnerModel extends BaseModel {
  @ApiProperty()
  location?: LocationEntityModel;

  @ApiProperty()
  service_class?: ServiceClassModel[];
}
