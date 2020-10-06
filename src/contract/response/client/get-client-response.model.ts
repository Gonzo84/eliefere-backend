import { ClientModel } from '../..';

export class GetClientResponse {
  client: ClientModel;

  constructor(client: ClientModel) {
    this.client = client;
  }
}
