import {
  Entity,
  Index, OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { PartnerModel, LocationModel } from '../../contract';
import { BaseEntity } from './base.entity';
// eslint-disable-next-line import/no-cycle
import { Location } from '../location/location.entity';
// eslint-disable-next-line import/no-cycle
import { ServiceClassEntity } from '../services/service-class.entity';
import { ServiceClassModel } from '../../contract/models/users/service-class.model';


@Entity('partners')
@Unique('unique_partner_username', ['username'])
@Unique('unique_partner_email', ['email'])
@Index('index_partner_username', ['username'])
@Index('index_partner_email', ['email'])
export class Partner extends BaseEntity implements PartnerModel {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Location, (location) => location.partner,
    {
      cascade: ['insert', 'update'],
    })
  // eslint-disable-next-line max-len
  location?: LocationModel; // TODO fix this typescript problem, there should be Location entity, not any

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => ServiceClassEntity, (sc) => sc.partner)
  // eslint-disable-next-line max-len
  service_class?: ServiceClassModel[]; // TODO fix this typescript problem, there should be Location entity, not any
}
