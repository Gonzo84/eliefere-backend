import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { LocationService } from './location.service';
import { LocationEntity } from '../entities';
import { LocationController } from './location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [LocationService],
  exports: [LocationService],
  controllers: [LocationController],

})
export class LocationModule {
}
