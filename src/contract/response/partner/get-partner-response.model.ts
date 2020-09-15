import { Partner } from '../../index';

export class GetPartnerResponse {
  partner: Partner;

  constructor(partner: Partner) {
    this.partner = partner;
  }
}
