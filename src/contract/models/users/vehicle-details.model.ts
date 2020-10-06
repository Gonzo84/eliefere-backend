import { ApiProperty } from '@nestjs/swagger';
import { VehiclePhotosModel } from './vehicle-photos.model';

export class VehicleDetailsModel {
  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  photos: VehiclePhotosModel[];
}
