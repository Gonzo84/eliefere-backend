import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import {
  NearestRequestModel,
  NearestResponse,
  PricesResponse,
  RouteRequestModel,
} from '../contract';

import * as conf from '../config/config';

const OPENSTREETMAP_URL = 'https://routing.openstreetmap.de/';

@Injectable()
export class RoutingService {
  constructor(private httpService: HttpService) {
  }

  public findNearest(nearestRequestModel: NearestRequestModel): Observable<NearestResponse> {
    return this.httpService.get(`${conf.default.osrm.server}nearest/v1/driving/${nearestRequestModel.longitude},${nearestRequestModel.latitude}?number=20&bearings=0,20`)
      .pipe(
        map((response) => new NearestResponse(response.data)),
      );
  }

  public getPrices(routeRequestModel: RouteRequestModel): Observable<PricesResponse> {
    const TYPE_OF_TRANSPORT_MAP = {
      0: 'courier',
      1: 'bike',
      2: 'regular_car',
    };
    return this.getDistances(routeRequestModel).pipe(
      map((resp) => new PricesResponse(resp.map((data, index) => {
        return {
          type: TYPE_OF_TRANSPORT_MAP[index],
          data: data.data,
        };
      }))),
    );
  }

  public getDistances(routeRequestModel: RouteRequestModel): Observable<any[]> {
    const startLat = routeRequestModel.start[0];
    const startLong = routeRequestModel.start[1];
    const destinationLat = routeRequestModel.destination[0];
    const destinationLLong = routeRequestModel.destination[1];
    const bike = this.httpService.get(`${OPENSTREETMAP_URL}routed-bike/route/v1/driving/${startLat},${startLong};${destinationLat},${destinationLLong}?overview=false`);
    const car = this.httpService.get(`${OPENSTREETMAP_URL}routed-car/route/v1/driving/${startLat},${startLong};${destinationLat},${destinationLLong}?overview=false`);
    const foot = this.httpService.get(`${OPENSTREETMAP_URL}routed-foot/route/v1/driving/${startLat},${startLong};${destinationLat},${destinationLLong}?overview=false`);
    return forkJoin([foot, bike, car]);
  }
}
