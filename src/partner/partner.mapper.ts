import { isEmpty } from 'lodash';
import { Partner as IPartner, INearestPartners } from '../contract';
import { Partner } from '../entities/users/partner.entity';
import { Location } from '../entities/location/location.entity';

export function toPartnerEntity(partnerModel: IPartner, passwordHash: string): Partner {
  if (partnerModel === null || partnerModel === undefined) {
    return null;
  }
  const partnerEntity = new Partner();
  partnerEntity.username = partnerModel.username.toLowerCase();
  partnerEntity.email = partnerModel.email.toLowerCase();
  partnerEntity.passwordHash = passwordHash;
  partnerEntity.firstName = partnerModel.firstName;
  partnerEntity.lastName = partnerModel.lastName;
  partnerEntity.middleName = partnerModel.middleName;
  // this nesting is a way to set the data in relational table
  const locationEntity = new Location();
  locationEntity.location = partnerModel.location;
  partnerEntity.location = locationEntity;
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
  partnerEntity: Partner,
  partnerModel: IPartner,
): Partner {
  const updatedPartnerEntity = new Partner();
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
  updatedPartnerEntity.middleName = (partnerModel.middleName !== undefined)
    ? partnerModel.middleName : partnerEntity.middleName;
  updatedPartnerEntity.image = (partnerModel.image !== undefined)
    ? partnerModel.image : partnerEntity.image;
  updatedPartnerEntity.birthDate = (partnerModel.birthDate !== undefined)
    ? partnerModel.birthDate : partnerEntity.birthDate;
  let location;
  if (isEmpty(partnerModel.location)) {
    location = partnerEntity.location;
  } else {
    location = new Location();
    location.location = partnerModel.location;
    location.partnerId = partnerModel.id;
  }
  updatedPartnerEntity.location = location;
  return updatedPartnerEntity;
}
