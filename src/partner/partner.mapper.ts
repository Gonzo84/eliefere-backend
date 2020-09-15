import { Partner as IPartner } from '../contract';
import { Partner } from '../models/users/partner.entity';

export function toPartnerEntity(partnerModel: IPartner): Partner {
  if (partnerModel === null || partnerModel === undefined) {
    return null;
  }
  const partnerEntity = new Partner();
  partnerEntity.id = partnerModel.id;
  partnerEntity.username = partnerModel.username;
  partnerEntity.email = partnerModel.email;
  partnerEntity.emailVerified = partnerModel.emailVerified;
  partnerEntity.firstName = partnerModel.firstName;
  partnerEntity.lastName = partnerModel.lastName;
  partnerEntity.middleName = partnerModel.middleName;
  partnerEntity.image = partnerModel.image;
  partnerEntity.birthDate = partnerModel.birthDate;
  partnerEntity.registrationDate = partnerModel.registrationDate;
  return partnerEntity;
}

export function toPartnerModel(partnerEntity: Partner): IPartner {
  if (partnerEntity === null || partnerEntity === undefined) {
    return null;
  }
  const partnerModel = new Partner();
  partnerModel.id = partnerEntity.id;
  partnerModel.username = partnerEntity.username;
  partnerModel.email = partnerEntity.email;
  partnerModel.emailVerified = partnerEntity.emailVerified;
  partnerModel.firstName = partnerEntity.firstName;
  partnerModel.lastName = partnerEntity.lastName;
  partnerModel.middleName = partnerEntity.middleName;
  partnerModel.image = partnerEntity.image;
  partnerModel.birthDate = partnerEntity.birthDate;
  partnerModel.registrationDate = partnerEntity.registrationDate;
  return partnerModel;
}

/**
 * Updates partnerEntity's fields with partnerModel's defined field values.
 * Ignores relations. Does not update some fields' values (id, email,
 * emailVerified, registrationDate) on purpose.
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
  // registrationDate can't be updated
  updatedPartnerEntity.registrationDate = partnerEntity.registrationDate;
  return updatedPartnerEntity;
}
