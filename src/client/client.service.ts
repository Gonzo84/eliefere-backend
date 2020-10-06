import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities';
import { SignupRequest } from '../contract';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
  }

  public async getClientEntityById(id: number): Promise<ClientEntity> {
    return this.clientRepository.findOne(id);
  }

  public async getClientEntityByUsername(username: string): Promise<ClientEntity> {
    const normalizedUsername = username.toLowerCase();
    return this.clientRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getClientEntityByEmail(email: string): Promise<ClientEntity> {
    const normalizedEmail = email.toLowerCase();
    return this.clientRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getClientEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<ClientEntity> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.clientRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });
  }

  public async createClient(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<ClientEntity> {
    const newClient = new ClientEntity();
    newClient.username = signupRequest.username.toLowerCase();
    newClient.email = signupRequest.email.toLowerCase();
    newClient.passwordHash = passwordHash;
    newClient.firstName = signupRequest.firstName;
    newClient.lastName = signupRequest.lastName;
    try {
      await this.clientRepository.save(newClient);
      return newClient;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updatePassword(
    userId: number,
    passwordHash: string,
  ): Promise<void> {
    const clientEntity = await this.clientRepository.findOne(userId);
    if (clientEntity === null || clientEntity === undefined) {
      Logger.warn(
        `Password change of non-existent account with id ${userId} is rejected.`,
      );
      throw new NotFoundException();
    }

    clientEntity.passwordHash = passwordHash;
    await this.clientRepository.update(clientEntity.id, clientEntity);
  }

  public async updateClient(clientEntity: ClientEntity): Promise<void> {
    // TODO: Email update should be separated
    await ClientService.validateClient(clientEntity);
    try {
      await this.clientRepository.update(clientEntity.id, clientEntity);
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
  }

  private static async validateClient(client: ClientEntity): Promise<void> {
    const errors = await validate(client, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
