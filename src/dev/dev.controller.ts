import {
  Controller, Get, HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { seedDb } from '../scripts/seed';
import { LatLong } from '../contract/models/lat-long.model';

@ApiTags('dev')
@Controller('dev')
export class DevController {
  @Get('seed-db')
  @HttpCode(HttpStatus.OK)
  async seedDB(
    @Query() query: LatLong,
  ): Promise<void> {
    const { lat, long } = query;
    seedDb.run(lat, long);
  }
}
