import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationModel {
  @ApiProperty()
  @IsDefined()
  type: string;

  @ApiProperty()
  @IsDefined()
  coordinates: Array<number>;
}
