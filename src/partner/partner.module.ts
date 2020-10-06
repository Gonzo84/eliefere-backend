import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PartnerService } from './partner.service';
import { Partner } from '../entities';
import { PartnerController } from './partner.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    LocationModule,
  ],
  providers: [PartnerService],
  exports: [PartnerService],
  controllers: [PartnerController],

})
export class PartnerModule {

}
