import { createConnection, ConnectionOptions, getConnection } from 'typeorm';
import * as argon2 from 'argon2';
import { configService } from '../config/config.service';
import {
  ClientEntity,
  PartnerEntity,
  LocationEntity,
  ServiceClassEntity,
  VehicleDetailsEntity,
  VehiclePhotoEntity,
} from '../entities';
import { ClientService } from '../client/client.service';
import { PartnerService } from '../partner/partner.service';
import { LocationService } from '../location/location.service';
import { ServiceClassService } from '../partner/service-class.service';
import { ServiceClassRequest } from '../contract';

class SeedDB {
  // eslint-disable-next-line class-methods-use-this
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
    const clientService = new ClientService(connection.getRepository(ClientEntity));
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
    const typeOfServicesArr = ['courier', 'small_car', 'regular_car', 'big_car', 'van', 'truck'];
    // eslint-disable-next-line max-len
    const serviceClassRepo = connection.getRepository(ServiceClassEntity);
    const vehicleDetailsRepo = connection.getRepository(VehicleDetailsEntity);
    const cehiclePhotoRepo = connection.getRepository(VehiclePhotoEntity);


    const partnerService = new PartnerService(
      connection.getRepository(PartnerEntity),
      new LocationService(connection.getRepository(LocationEntity)),
      new ServiceClassService(serviceClassRepo, vehicleDetailsRepo, cehiclePhotoRepo),
    );
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
        role: 'partner',
        location: {
          type: 'Point',
          coordinates: [latitude - 0.05 + Math.random() / 10, longitude - 0.5 + Math.random() / 10],
        },
      };
      // eslint-disable-next-line no-await-in-loop
      const partner = await partnerService.createPartner(
        partnerEntity,
        hash,
      );
      const serviceClassRequest: ServiceClassRequest = {
        partnerId: partner.id,
        type_of_service: typeOfServicesArr[Math.floor(Math.random() * typeOfServicesArr.length)],
        details: {
          verified: false,
          photos: [{
            url: 'https://picsum.photos/200',
          }, {
            url: 'https://picsum.photos/200',
          }, {
            url: 'https://picsum.photos/200',
          }],
        },
      };
      // eslint-disable-next-line no-await-in-loop
      await partnerService.postServiceClass(serviceClassRequest);
    }
  }
}

const seedDb = new SeedDB();

export { seedDb };
