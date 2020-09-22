import {
  Entity,
  Index,
  OneToOne,
  Unique,
} from 'typeorm';
import { Partner as IPartner } from '../../contract';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { Location } from '../location/location.entity';

@Entity('partners')
@Unique('unique_partner_username', ['username'])
@Unique('unique_partner_email', ['email'])
@Index('index_partner_username', ['username'])
@Index('index_partner_email', ['email'])
export class Partner extends BaseEntity implements IPartner {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Location, (location) => location.partner,
    {
      cascade: ['insert', 'update'],
    })
  location: any; // TODO fix this typescript problem, there should be Location entity, not any
}
