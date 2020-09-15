import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('Client Controller', () => {
  let controller: ClientController;
  let spyService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService,
        {
          provide: 'ClientRepository',
          useClass: Repository,
        }],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    spyService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
