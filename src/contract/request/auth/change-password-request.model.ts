import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequest {
  @ApiProperty({
    nullable: false,
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
