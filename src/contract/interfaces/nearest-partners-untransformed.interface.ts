import { LocationModel, PartnerModel } from '..';

export interface INearestPartnersUntransformed {
  partnerId: number;
  location: LocationModel;
  partner: PartnerModel
}
