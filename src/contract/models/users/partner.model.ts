import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { Location } from '../location.model';

export class Partner extends BaseModel {
  @ApiProperty()
  location?: Location;
}
