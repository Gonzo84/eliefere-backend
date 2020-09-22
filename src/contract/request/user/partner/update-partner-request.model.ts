import { IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '../../..';

export class UpdatePartnerRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsDefined()
  @Type(() => Partner)
  partner: Partner;
}
