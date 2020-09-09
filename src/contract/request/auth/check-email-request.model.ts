import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckEmailRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
