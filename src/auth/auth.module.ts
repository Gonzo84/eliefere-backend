import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ClientModule } from '../client/client.module';
import { AuthController } from './auth.controller';
import { Client } from '../models/users/client.entity';
import { JwtStrategy } from './jwt.strategy';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { EmailVerification } from './email-verification.entity';
import { EmailChange } from './email-change.entity';
import { PasswordReset } from './password-reset.entity';
import { configService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      EmailVerification,
      EmailChange,
      PasswordReset,
    ]),
    ClientModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getConf().jwt.secretOrKey,
      signOptions: {
        expiresIn: configService.getConf().jwt.expiresIn,
      },
    }),
    MailSenderModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
}
