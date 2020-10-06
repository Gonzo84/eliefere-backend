import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationModel } from '../..';

export class UpdateLocationRequest {
  @ApiProperty({
    nullable: true,
  })
  @IsDefined()
  @Type(() => LocationModel)
  location?: LocationModel;
}
