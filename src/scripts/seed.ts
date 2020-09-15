import { createConnection, ConnectionOptions } from 'typeorm';
import * as argon2 from 'argon2';
import { configService } from '../config/config.service';
import { Client } from '../models/users/client.entity';
import { ClientService } from '../client/client.service';
import { Partner } from '../models/users/partner.entity';
import { PartnerService } from '../partner/partner.service';

async function run() {
  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    // eslint-disable-next-line no-return-assign,no-param-reassign
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const typeOrmConfig = configService.getTypeOrmConfig();
  const opt = {
    ...typeOrmConfig,
    entities: ['src/**/*.entity.ts'],
    debug: true,
  };
  const connection = await createConnection(opt as ConnectionOptions);
  const hash = await argon2.hash(seedId);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  seedClients(connection, seedId, hash);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  seedPartner(connection, seedId, hash);
  console.log('seeding succeeded');
}

async function seedClients(connection, seedId, hash) {
  const clientService = new ClientService(connection.getRepository(Client));
  let index = 0;
  while (index < 10) {
    index++;
    const clientEntity = {
      email: `email.${seedId}.${index}@test.com`,
      username: `username-${seedId}-${index}`,
      password: hash,
      firstName: `firstName-${seedId}-${index}`,
      lastName: `lastName-${seedId}-${index}`,
      middleName: `middleName-${seedId}-${index}`,
    };

    await clientService.createClient(
      clientEntity,
      hash,
    );
  }
}

async function seedPartner(connection, seedId, hash) {
  const partnerService = new PartnerService(connection.getRepository(Partner));
  let index = 0;
  while (index < 10) {
    index++;
    const partnerEntity = {
      email: `email.${seedId}.${index}@test.com`,
      username: `username-${seedId}-${index}`,
      password: hash,
      firstName: `firstName-${seedId}-${index}`,
      lastName: `lastName-${seedId}-${index}`,
      middleName: `middleName-${seedId}-${index}`,
    };

    await partnerService.createPartner(
      partnerEntity,
      hash,
    );
  }
}

run();
