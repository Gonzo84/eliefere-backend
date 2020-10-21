import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RouteRequestModel {
  @ApiProperty()
  @IsDefined()
  start: number[];

  @ApiProperty()
  @IsDefined()
  destination: number[];
}
