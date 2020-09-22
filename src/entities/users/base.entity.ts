import {
  Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, Matches, MaxLength,
} from 'class-validator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(32)
  @IsLowercase()
  @Column('text')
  username: string;

  @IsEmail()
  @Column('text')
  email: string;

  @Column('text')
  passwordHash: string;

  @IsNotEmpty()
  @MaxLength(20)
  @Column('text')
  firstName: string;

  @IsNotEmpty()
  @MaxLength(40)
  @Column('text')
  lastName: string;

  @IsOptional()
  @MaxLength(40)
  @Column('text', { nullable: true })
  middleName?: string;

  @IsOptional()
  @Column('text', { nullable: true })
  image?: string;

  @IsBoolean()
  @Column('boolean', { default: false })
  emailVerified: boolean;

  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  @Column('date', { nullable: true })
  birthDate?: Date;

  @CreateDateColumn({
    nullable: false,
    name: 'dt_create',
  })
  createdOn: Date;

  @UpdateDateColumn({
    nullable: false,
    name: 'dt_modified',
  })
  modifiedOn: Date;
}
