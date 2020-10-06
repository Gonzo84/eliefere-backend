import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationModel } from './location.model';
import { PartnerModel } from './users/partner.model';

export class LocationEntityModel {
  @ApiProperty()
  @IsDefined()
  location: LocationModel;

  @ApiProperty()
  @IsDefined()
  partner: any; // TODO fix this ts problem
}
