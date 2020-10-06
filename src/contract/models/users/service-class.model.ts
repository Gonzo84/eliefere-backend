import {} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleDetailsModel } from './vehicle-details.model';

export class ServiceClassModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type_of_service: string;

  @ApiProperty()
  details: VehicleDetailsModel;
}
