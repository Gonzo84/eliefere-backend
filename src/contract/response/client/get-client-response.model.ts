import { Client } from '../../index';

export class GetClientResponse {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
