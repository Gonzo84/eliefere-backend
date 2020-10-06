import { IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PartnerModel } from '../../..';

export class UpdatePartnerRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsDefined()
  @Type(() => PartnerModel)
  partner: PartnerModel;
}
