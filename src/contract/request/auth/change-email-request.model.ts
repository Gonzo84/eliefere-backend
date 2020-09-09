import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailRequest {
  @ApiProperty({
    nullable: false,
    description: 'email',
  })
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
