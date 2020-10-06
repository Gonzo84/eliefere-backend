import {
  Entity,
  Index, OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { LocationEntity, ServiceClassEntity } from '..';
import { PartnerModel } from '../../contract';

@Entity('partners')
@Unique('unique_partner_username', ['username'])
@Unique('unique_partner_email', ['email'])
@Index('index_partner_username', ['username'])
@Index('index_partner_email', ['email'])
export class PartnerEntity extends BaseEntity implements PartnerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => LocationEntity, (location) => location.partner,
    {
      cascade: ['insert', 'update', 'remove'],
    })
  // eslint-disable-next-line max-len
  location?: LocationEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => ServiceClassEntity, (sc) => sc.partner, {
    cascade: ['insert', 'update', 'remove'],
  })
  service_class?: Array<ServiceClassEntity>;
}
