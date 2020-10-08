import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { ServiceClassModel } from '../../../models/users/service-class.model';

export class ServiceClassRequest extends ServiceClassModel {
  @ApiProperty()
  @IsDefined()
  partnerId: number;
}
