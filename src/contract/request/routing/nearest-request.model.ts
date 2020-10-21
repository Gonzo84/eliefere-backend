import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class NearestRequestModel {
  @ApiProperty()
  @IsDefined()
  longitude: string;

  @ApiProperty()
  @IsDefined()
  latitude: string;
}
