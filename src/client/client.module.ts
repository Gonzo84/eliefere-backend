import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClientService } from './client.service';
import { Client } from '../entities';
import { ClientController } from './client.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [ClientService],
  exports: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {
}
