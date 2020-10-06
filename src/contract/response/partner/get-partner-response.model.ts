import { PartnerModel } from '../..';

export class GetPartnerResponse {
  partner: PartnerModel;

  constructor(partner: PartnerModel) {
    this.partner = partner;
  }
}
