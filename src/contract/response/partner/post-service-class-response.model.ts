import { ServiceClassEntity } from '../../../entities';

export class PostServiceClassResponse {
  serviceClass;

  constructor(serviceClass: ServiceClassEntity) {
    this.serviceClass = serviceClass;
  }
}
