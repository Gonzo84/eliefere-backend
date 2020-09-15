import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { configService } from '../config/config.service';
import { ClientService } from '../client/client.service';

const config = configService.getConf();

describe('Auth Controller', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: config.jwt.secretOrKey,
          signOptions: {
            expiresIn: config.jwt.expiresIn,
          },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        AuthService,
        MailSenderService,
        ClientService,
        {
          provide: 'ClientRepository',
          useClass: Repository,
        },
        {
          provide: 'EmailVerificationRepository',
          useClass: Repository,
        },
        {
          provide: 'EmailChangeRepository',
          useClass: Repository,
        },
        {
          provide: 'PasswordResetRepository',
          useClass: Repository,
        }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
