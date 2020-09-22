import { Client as IClient } from '../contract';
import { Client } from '../entities/users/client.entity';

export function toClientEntity(clientModel: IClient): Client {
  if (clientModel === null || clientModel === undefined) {
    return null;
  }
  const clientEntity = new Client();
  clientEntity.id = clientModel.id;
  clientEntity.username = clientModel.username;
  clientEntity.email = clientModel.email;
  clientEntity.emailVerified = clientModel.emailVerified;
  clientEntity.firstName = clientModel.firstName;
  clientEntity.lastName = clientModel.lastName;
  clientEntity.middleName = clientModel.middleName;
  clientEntity.image = clientModel.image;
  clientEntity.birthDate = clientModel.birthDate;
  return clientEntity;
}

export function toClientModel(clientEntity: Client): IClient {
  if (clientEntity === null || clientEntity === undefined) {
    return null;
  }
  const clientModel = new Client();
  clientModel.id = clientEntity.id;
  clientModel.username = clientEntity.username;
  clientModel.email = clientEntity.email;
  clientModel.emailVerified = clientEntity.emailVerified;
  clientModel.firstName = clientEntity.firstName;
  clientModel.lastName = clientEntity.lastName;
  clientModel.middleName = clientEntity.middleName;
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
  clientEntity: Client,
  clientModel: IClient,
): Client {
  const updatedClientEntity = new Client();
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
  updatedClientEntity.middleName = (clientModel.middleName !== undefined)
    ? clientModel.middleName : clientEntity.middleName;
  updatedClientEntity.image = (clientModel.image !== undefined)
    ? clientModel.image : clientEntity.image;
  updatedClientEntity.birthDate = (clientModel.birthDate !== undefined)
    ? clientModel.birthDate : clientEntity.birthDate;
  return updatedClientEntity;
}
