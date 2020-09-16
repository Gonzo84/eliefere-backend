import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PartnerService } from './partner.service';
import { Partner } from '../entities/users/partner.entity';
import { PartnerController } from './partner.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PartnerService],
  exports: [PartnerService],
  controllers: [PartnerController],

})
export class PartnerModule {

}
