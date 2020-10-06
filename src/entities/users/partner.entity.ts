import {
  Entity,
  Index, OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Location, ServiceClassEntity } from '..';

@Entity('partners')
@Unique('unique_partner_username', ['username'])
@Unique('unique_partner_email', ['email'])
@Index('index_partner_username', ['username'])
@Index('index_partner_email', ['email'])
export class Partner extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Location, (location) => location.partner,
    {
      cascade: ['insert', 'update', 'remove'],
    })
  // eslint-disable-next-line max-len
  location?: Location; // TODO fix this typescript problem, there should be Location entity, not any

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => ServiceClassEntity, (sc) => sc.partner, {
    cascade: ['insert', 'update', 'remove'],
  })
  service_class?: Array<ServiceClassEntity>;
}
