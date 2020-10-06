import {
  Entity, Index, Unique,
} from 'typeorm';
import { ClientModel } from '../../contract';
import { BaseEntity } from './base.entity';

@Entity('clients')
@Unique('unique_client_username', ['username'])
@Unique('unique_client_email', ['email'])
@Index('index_client_username', ['username'])
@Index('index_client_email', ['email'])
export class ClientEntity extends BaseEntity implements ClientModel {
}
