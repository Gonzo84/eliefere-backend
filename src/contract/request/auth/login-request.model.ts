import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    description: 'username or email',
  })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    nullable: false,
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
