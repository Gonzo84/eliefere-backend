import {
  Controller, Get, HttpCode, HttpStatus, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { seedDb, seedTOS } from '../scripts/seed';
import { LatLong } from '../contract/models/lat-long.model';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('dev')
@Controller('dev')
export class DevController {
  @Get('seed-db')
  @HttpCode(HttpStatus.OK)
  async seedDB(
    @Query() query: LatLong,
  ): Promise<string> {
    const { lat, long, number } = query;
    await seedDb.run(lat, long, parseInt(number, 10));
    return 'alles okay';
  }

  // @ApiBearerAuth()
  @Get('seed-tos')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard())
  async seedTOS(): Promise<string> {
    await seedTOS.run();
    return 'alles okay';
  }
}
