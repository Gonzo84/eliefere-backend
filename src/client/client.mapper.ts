import { ClientModel } from '../contract';
import { ClientEntity } from '../entities';

export function toClientEntity(clientModel: ClientModel): ClientEntity {
  if (clientModel === null || clientModel === undefined) {
    return null;
  }
  const clientEntity = new ClientEntity();
  clientEntity.id = clientModel.id;
  clientEntity.username = clientModel.username;
  clientEntity.email = clientModel.email;
  clientEntity.emailVerified = clientModel.emailVerified;
  clientEntity.firstName = clientModel.firstName;
  clientEntity.lastName = clientModel.lastName;
  clientEntity.image = clientModel.image;
  clientEntity.birthDate = clientModel.birthDate;
  return clientEntity;
}

export function toClientModel(clientEntity: ClientEntity): ClientModel {
  if (clientEntity === null || clientEntity === undefined) {
    return null;
  }
  const clientModel = new ClientEntity();
  clientModel.id = clientEntity.id;
  clientModel.username = clientEntity.username;
  clientModel.email = clientEntity.email;
  clientModel.emailVerified = clientEntity.emailVerified;
  clientModel.firstName = clientEntity.firstName;
  clientModel.lastName = clientEntity.lastName;
  clientModel.image = clientEntity.image;
  clientModel.birthDate = clientEntity.birthDate;
  return clientModel;
}

/**
 * Updates clientEntity's fields with clientModel's defined field values.
 * Ignores relations. Does not update some fields' values (id, email,
 * emailVerified) on purpose.
 * @param clientEntity Entity to update fields
 * @param clientModel Model that contains new values
 */
export function updateClientEntityFields(
  clientEntity: ClientEntity,
  clientModel: ClientModel,
): ClientEntity {
  const updatedClientEntity = new ClientEntity();
  // id cannot change
  updatedClientEntity.id = clientEntity.id;
  updatedClientEntity.username = (clientModel.username !== undefined)
    ? clientModel.username : clientEntity.username;
  // email update is separated
  updatedClientEntity.email = clientEntity.email;
  // email verification is separated
  updatedClientEntity.emailVerified = clientEntity.emailVerified;
  updatedClientEntity.firstName = (clientModel.firstName !== undefined)
    ? clientModel.firstName : clientEntity.firstName;
  updatedClientEntity.lastName = (clientModel.lastName !== undefined)
    ? clientModel.lastName : clientEntity.lastName;
  updatedClientEntity.image = (clientModel.image !== undefined)
    ? clientModel.image : clientEntity.image;
  updatedClientEntity.birthDate = (clientModel.birthDate !== undefined)
    ? clientModel.birthDate : clientEntity.birthDate;
  return updatedClientEntity;
}
