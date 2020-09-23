import {
  IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, Matches, MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseModel {
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  @ApiProperty()
  username?: string;

  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsBoolean()
  @ApiProperty()
  emailVerified?: boolean;

  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ]+$'))
  @MaxLength(20)
  @ApiProperty()
  firstName?: string;

  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(40)
  @ApiProperty()
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @ApiProperty()
  middleName?: string;

  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  @ApiProperty()
  birthDate?: Date;
}
