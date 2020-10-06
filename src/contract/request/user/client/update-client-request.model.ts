import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ClientModel } from '../../..';

export class UpdateClientRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ClientModel)
  client: ClientModel;
}
