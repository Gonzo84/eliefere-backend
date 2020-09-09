import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../..';

export class UpdateUserRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
