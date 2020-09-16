import {
  IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ILocation } from '../../interfaces/location.interface';

export class SignupRequest {
  @ApiProperty({
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    nullable: false,
    pattern: '^[a-zA-Z0-9\\-]+$',
    minimum: 20,
  })
  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username: string;

  @ApiProperty({
    nullable: false,
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    nullable: false,
    minimum: 20,
    pattern: '^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$',
  })
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  firstName: string;

  @ApiProperty({
    nullable: false,
    minimum: 20,
    pattern: '^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$',
  })
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  lastName: string;

  @ApiProperty({
    nullable: false,
    minimum: 20,
    pattern: '^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$',
  })
  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  middleName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  location?: ILocation;
}
