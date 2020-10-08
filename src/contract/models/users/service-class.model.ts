import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleDetailsModel } from './vehicle-details.model';

export class ServiceClassModel {
  @ApiProperty()
  @IsDefined()
  type_of_service: string;

  @ApiProperty()
  @IsDefined()
  details?: VehicleDetailsModel;
}
