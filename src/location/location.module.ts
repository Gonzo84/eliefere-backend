import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { LocationService } from './location.service';
import { Location } from '../entities/location/location.entity';
import { LocationController } from './location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [LocationService],
  exports: [LocationService],
  controllers: [LocationController],

})
export class LocationModule {
}
