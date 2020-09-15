import {
  Entity, Index, Unique,
} from 'typeorm';
import { Client as IClient } from '../../contract';
import { BaseEntity } from './base.entity';

@Entity('clients')
@Unique('unique_client_username', ['username'])
@Unique('unique_client_email', ['email'])
@Index('index_client_username', ['username'])
@Index('index_client_email', ['email'])
export class Client extends BaseEntity implements IClient {
}
