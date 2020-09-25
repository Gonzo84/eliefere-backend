import { createConnection, ConnectionOptions, getConnection } from 'typeorm';
import * as argon2 from 'argon2';
import { configService } from '../config/config.service';
import { Client } from '../entities/users/client.entity';
import { ClientService } from '../client/client.service';
import { Partner } from '../entities/users/partner.entity';
import { PartnerService } from '../partner/partner.service';
import { LocationService } from '../location/location.service';
import { Location } from '../entities/location/location.entity';

class SeedDB {
  public async run(lat: string, long: string) {
    const seedId = Date.now()
      .toString()
      .split('')
      .reverse()
      // eslint-disable-next-line no-return-assign,no-param-reassign
      .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

    // this is for local development when debugging application with nest start --debug --watch

    // const typeOrmConfig = configService.getTypeOrmConfig();
    // const opt = {
    //   ...typeOrmConfig,
    //   entities: ['src/**/*.entity.ts'],
    //   host: 'localhost',
    //   debug: true,
    // };
    // const connection = await createConnection(opt as ConnectionOptions);
    const connection = getConnection();
    const hash = await argon2.hash(seedId);
    await SeedDB.seedClients(connection, seedId, hash);
    await SeedDB.seedPartner(connection, seedId, hash, lat, long);
  }

  private static async seedClients(connection, seedId, hash) {
    const clientService = new ClientService(connection.getRepository(Client));
    let index = 0;
    while (index < 10) {
      // eslint-disable-next-line no-plusplus
      index++;
      const clientEntity = {
        email: `email.${seedId}.${index}@test.com`,
        username: `username-${seedId}-${index}`,
        password: hash,
        firstName: `firstName-${seedId}-${index}`,
        lastName: `lastName-${seedId}-${index}`,
        middleName: `middleName-${seedId}-${index}`,
        role: 'client',
      };
      // eslint-disable-next-line no-await-in-loop
      await clientService.createClient(
        clientEntity,
        hash,
      );
    }
  }

  private static async seedPartner(connection, seedId, hash, lat, long) {
    const latitude = lat ? parseFloat(lat) : 49.502074;
    const longitude = long ? parseFloat(long) : 8.485755;
    // eslint-disable-next-line max-len
    const partnerService = new PartnerService(connection.getRepository(Partner), new LocationService(connection.getRepository(Location)));
    let index = 0;
    while (index < 10) {
      // eslint-disable-next-line no-plusplus
      index++;
      const partnerEntity = {
        email: `email.${seedId}.${index}@test.com`,
        username: `username-${seedId}-${index}`,
        password: hash,
        firstName: `firstName-${seedId}-${index}`,
        lastName: `lastName-${seedId}-${index}`,
        middleName: `middleName-${seedId}-${index}`,
        role: 'partner',
        location: {
          type: 'Point',
          coordinates: [latitude - 0.5 + Math.random(), longitude - 0.5 + Math.random()],
        },
      };
      // eslint-disable-next-line no-await-in-loop
      await partnerService.createPartner(
        partnerEntity,
        hash,
      );
    }
  }
}

const seedDb = new SeedDB();

export { seedDb };
