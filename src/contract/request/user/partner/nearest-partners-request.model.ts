import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class NearestPartnersRequest {
  @ApiProperty()
  @IsDefined()
  location: number[];

  @ApiProperty()
  @IsDefined()
  distance: number;
}
