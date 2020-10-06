import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { LocationModel } from '../location.model';
import { ServiceClassModel } from './service-class.model';

export class PartnerModel extends BaseModel {
  @ApiProperty()
  location?: LocationModel;

  @ApiProperty()
  service_class?: ServiceClassModel[];
}
