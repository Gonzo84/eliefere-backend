import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../..';

export class UpdateClientRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => Client)
  client: Client;
}
