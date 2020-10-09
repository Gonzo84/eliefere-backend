import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LatLong {
  @IsNotEmpty()
  @ApiProperty()
  lat: string;

  @IsNotEmpty()
  @ApiProperty()
  long: string;

  @IsNotEmpty()
  @ApiProperty()
  number: string;
}
