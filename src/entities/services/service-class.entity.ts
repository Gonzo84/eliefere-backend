import {
  Column, Entity, Index, ManyToOne, OneToOne, PrimaryColumn, Unique,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Partner } from '../users/partner.entity';
// eslint-disable-next-line import/no-cycle
import { VehicleDetailsEntity } from './vehicle-details.entity';

@Entity('service-class')
@Unique('unique_partner_service_class_id', ['partnerId'])
@Index('index_partner_service_class_id', ['partnerId'])
export class ServiceClassEntity {
  @PrimaryColumn()
  partnerId: number;

  @Column()
  type_of_service: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => VehicleDetailsEntity, (details) => details.service,
    {
      cascade: ['insert', 'update'],
    })
  details: VehicleDetailsEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Partner, (partner) => partner.service_class)
  partner: Partner;
}
