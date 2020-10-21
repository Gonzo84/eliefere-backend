import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { RoutingService } from './routing.service';
import { NearestRequestModel, NearestResponse, RouteRequestModel } from '../contract';

@ApiTags('routing')
@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {
  }

  @Post('nearest')
  @HttpCode(HttpStatus.OK)
  findNearest(
    @Body() nearestRequestModel: NearestRequestModel,
  ): Observable<NearestResponse> {
    return this.routingService.findNearest(nearestRequestModel);
  }

  @Post('prices')
  @HttpCode(HttpStatus.OK)
  getPrices(
  @Body() routeRequestModel: RouteRequestModel,
  ) {
    return this.routingService.getPrices(routeRequestModel);
  }
}
