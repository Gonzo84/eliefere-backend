import {
  Body, Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Put, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocationService } from './location.service';
import { UpdateLocationRequest } from '../contract';

@ApiTags('location')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {
  }

  @ApiBearerAuth()
  @Put('set-location/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async updateLocation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationRequest: UpdateLocationRequest,
  ): Promise<void> {
    await this.locationService.updateLocation(
      id,
      updateLocationRequest,
    );
  }
}
