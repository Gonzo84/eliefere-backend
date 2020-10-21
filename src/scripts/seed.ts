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
  TypesOfServiceEntity,
} from '../entities';
import { ClientService } from '../client/client.service';
import { PartnerService } from '../partner/partner.service';
import { LocationService } from '../location/location.service';
import { ServiceClassService } from '../partner/service-class.service';
import { ServiceClassRequest, TypesOfServiceEnum } from '../contract';

class SeedTypeOfService {
  public async run() {
    const connection = getConnection();
    const typesOfSeriviceRepo = connection.getRepository(TypesOfServiceEntity);
    const tosArr = await typesOfSeriviceRepo.find();
    console.log('tosArr ', tosArr);
    if (tosArr && tosArr.length === 0) {
      const typesOfService = TypesOfServiceEnum;
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(typesOfService)) {
        const newTOSEntity = new TypesOfServiceEntity();
        newTOSEntity.name = value;
        // eslint-disable-next-line no-await-in-loop
        await typesOfSeriviceRepo.save(newTOSEntity);
      }
    }
  }
}

const seedTOS = new SeedTypeOfService();

class SeedDB {
  // eslint-disable-next-line class-methods-use-this
  public async run(lat: string, long: string, number = 10) {
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
    await SeedDB.seedClients(connection, seedId, hash, number);
    await SeedDB.seedPartner(connection, seedId, hash, lat, long, number);
  }

  private static async seedClients(connection, seedId, hash, number) {
    const clientService = new ClientService(connection.getRepository(ClientEntity));
    let index = 0;
    while (index < number) {
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

  private static async seedPartner(connection, seedId, hash, lat, long, number) {
    const latitude = lat ? parseFloat(lat) : 49.502074;
    const longitude = long ? parseFloat(long) : 8.485755;
    const typeOfServicesArr = ['courier', 'bike', 'regular_car', 'big_car', 'van', 'truck'];
    // eslint-disable-next-line max-len
    const serviceClassRepo = connection.getRepository(ServiceClassEntity);
    const vehicleDetailsRepo = connection.getRepository(VehicleDetailsEntity);
    const vehiclePhotoRepo = connection.getRepository(VehiclePhotoEntity);
    const typesOfSeriviceRepo = connection.getRepository(TypesOfServiceEntity);

    const partnerService = new PartnerService(
      connection.getRepository(PartnerEntity),
      new LocationService(connection.getRepository(LocationEntity)),
      new ServiceClassService(
        serviceClassRepo,
        vehicleDetailsRepo,
        vehiclePhotoRepo,
        typesOfSeriviceRepo,
      ),
    );
    let index = 0;
    while (index < number) {
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
        partner_id: partner.id,
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
      // eslint-disable-next-line no-await-in-loop
      await seedTOS.run();
    }
  }
}

const seedDb = new SeedDB();

export { seedDb, seedTOS };
