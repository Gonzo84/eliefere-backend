import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceClassModel } from '../../../models/users/service-class.model';

export class ServiceClassRequest {
  @ApiProperty()
  @IsDefined()
  @Type(() => ServiceClassModel)
  service_class: ServiceClassModel;
}
