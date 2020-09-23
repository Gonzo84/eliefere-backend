import { INearestPartners } from '../..';

export class GetNearestPartnersResponse {
  nearest;

  constructor(nearest: INearestPartners[]) {
    this.nearest = nearest;
  }
}
