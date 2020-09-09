import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckUsernameRequest {
  @ApiProperty({
    nullable: false,
    description: 'Unique username',
    maximum: 20,
  })
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
}
