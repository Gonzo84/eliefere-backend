import { isEmpty } from 'lodash';
import { PartnerModel, INearestPartners, SignupRequest } from '../contract';
import { PartnerEntity, LocationEntity, ServiceClassEntity } from '../entities';

export function toPartnerEntity(partnerModel: SignupRequest, passwordHash: string): PartnerEntity {
  if (partnerModel === null || partnerModel === undefined) {
    return null;
  }
  const partnerEntity = new PartnerEntity();
  partnerEntity.username = partnerModel.username.toLowerCase();
  partnerEntity.email = partnerModel.email.toLowerCase();
  partnerEntity.passwordHash = passwordHash;
  partnerEntity.firstName = partnerModel.firstName;
  partnerEntity.lastName = partnerModel.lastName;
  // this nesting is a way to set the data in relational table
  const locationEntity = new LocationEntity();
  locationEntity.location = partnerModel.location;
  partnerEntity.location = locationEntity;
  const sc = new ServiceClassEntity();
  partnerEntity.service_class = [sc];
  return partnerEntity;
}

/**
 * Updating Nearest Partner Model from INearestPartnersUntransformed
 * @param data INearestPartnersUntransformed[]
 */
export function toNearestPartnerModel(data: any[]): INearestPartners[] {
  return data.map((nearest) => {
    const { partner } = nearest;
    const { location } = nearest;
    delete location.partnerId;
    delete location.type;
    delete partner.passwordHash;
    delete partner.modifiedOn;
    delete partner.emailVerified;
    return {
      ...partner,
      ...location,
    };
  });
}

/**
 * Updates partnerEntity's fields with partnerModel's defined field values.
 * Ignores relations. Does not update some fields' values (id, email,
 * emailVerified) on purpose.
 * @param partnerEntity Entity to update fields
 * @param partnerModel Model that contains new values
 */
export function updatePartnerEntityFields(
  partnerEntity: PartnerEntity,
  partnerModel: PartnerModel,
): PartnerEntity {
  const updatedPartnerEntity = new PartnerEntity();
  // id cannot change
  updatedPartnerEntity.id = partnerEntity.id;
  updatedPartnerEntity.username = (partnerModel.username !== undefined)
    ? partnerModel.username : partnerEntity.username;
  // email update is separated
  updatedPartnerEntity.email = partnerEntity.email;
  // email verification is separated
  updatedPartnerEntity.emailVerified = partnerEntity.emailVerified;
  updatedPartnerEntity.firstName = (partnerModel.firstName !== undefined)
    ? partnerModel.firstName : partnerEntity.firstName;
  updatedPartnerEntity.lastName = (partnerModel.lastName !== undefined)
    ? partnerModel.lastName : partnerEntity.lastName;
  updatedPartnerEntity.image = (partnerModel.image !== undefined)
    ? partnerModel.image : partnerEntity.image;
  updatedPartnerEntity.birthDate = (partnerModel.birthDate !== undefined)
    ? partnerModel.birthDate : partnerEntity.birthDate;
  let location;
  if (isEmpty(partnerModel.location)) {
    location = partnerEntity.location;
  } else {
    location = new LocationEntity();
    location = partnerModel.location;
    location.partnerId = partnerModel.id;
  }
  updatedPartnerEntity.location = location;
  return updatedPartnerEntity;
}
