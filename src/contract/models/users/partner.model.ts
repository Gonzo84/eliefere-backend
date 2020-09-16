import { IsNotEmptyObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { ILocation } from '../../interfaces/location.interface';

export class Partner extends BaseModel {
  @IsNotEmptyObject()
  @ApiProperty()
  location: ILocation;
}
