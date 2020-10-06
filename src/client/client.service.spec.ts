import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';
import { ClientEntity } from '../entities';

describe('ClientService', () => {
  let service: ClientService;
  let spyRepository: Repository<ClientEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: 'ClientRepository',
          useClass: Repository,
        }],
    }).compile();

    service = module.get<ClientService>(ClientService);
    spyRepository = module.get<Repository<ClientEntity>>('ClientRepository');
  });

  describe('getClientEntityById', () => {
    it('should call repository with correct id', async () => {
      const id = 12313242;

      spyRepository.findOne = jest.fn();
      await service.getClientEntityById(id);

      expect(spyRepository.findOne).toBeCalledTimes(1);
      expect(spyRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should return the result from repository', async () => {
      const clientEntity = new ClientEntity();
      const userId = 123123;
      const mockFindOne = jest.fn();
      mockFindOne.mockReturnValue(clientEntity);
      spyRepository.findOne = mockFindOne;

      expect(await service.getClientEntityById(userId))
        .toStrictEqual(clientEntity);
    });
  });

  describe('getClientEntityByUsername', () => {
    it('should call repository with given username', async () => {
      const username = 'userName';

      spyRepository.findOne = jest.fn();
      await service.getClientEntityByUsername(username);

      expect(spyRepository.findOne).toBeCalledTimes(1);
      expect(spyRepository.findOne).toBeCalledWith({
        where:
          { username: username.toLowerCase() },
      });
    });

    it('should return the result from repository', async () => {
      const clientEntity = new ClientEntity();
      const username = 'userName';
      const mockFindOne = jest.fn();
      mockFindOne.mockReturnValue(clientEntity);
      spyRepository.findOne = mockFindOne;

      expect(await service.getClientEntityByUsername(username))
        .toStrictEqual(clientEntity);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
