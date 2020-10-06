import {
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationModel {
  @ApiProperty()
  type: string;

  @ApiProperty()
  coordinates: number[];
}
