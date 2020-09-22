import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { PartnerModule } from './partner/partner.module';
import { LocationModule } from './location/location.module';

import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ClientModule,
    AuthModule,
    MailSenderModule,
    PartnerModule,
    LocationModule,
  ],
})
export class AppModule {
}
