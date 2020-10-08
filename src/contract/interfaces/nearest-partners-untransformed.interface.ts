import { LocationModel, PartnerModel } from '..';

export interface INearestPartnersUntransformed {
  partner_id: number;
  location: LocationModel;
  partner: PartnerModel
}
