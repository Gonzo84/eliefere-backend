import { IsNotEmpty, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequest {
  @ApiProperty({
    nullable: false,
    minimum: 21,
  })
  @IsNotEmpty()
  @Length(21)
  token: string;

  @ApiProperty({
    nullable: false,
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
