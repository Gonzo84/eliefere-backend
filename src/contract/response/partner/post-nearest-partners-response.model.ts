import { INearestPartners } from '../..';

export class PostNearestPartnersResponse {
  nearest;

  constructor(nearest: INearestPartners[]) {
    this.nearest = nearest;
  }
}
