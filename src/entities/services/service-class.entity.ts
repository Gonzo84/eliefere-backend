import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  Unique,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { PartnerEntity } from '..';
// eslint-disable-next-line import/no-cycle
import { VehicleDetailsEntity } from './vehicle-details.entity';

@Entity('service-class')
@Unique('unique_partner_service_class_id', ['partner_id'])
@Index('index_partner_service_class_id', ['partner_id'])
export class ServiceClassEntity {
  @PrimaryColumn()
  partner_id: number;

  @Column()
  type_of_service: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => VehicleDetailsEntity, (details) => details.service,
    {
      cascade: ['insert', 'update'],
    })
  details: VehicleDetailsEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => PartnerEntity, (partner) => partner.service_class)
  @JoinColumn({ name: 'partner_id' })
  partner: PartnerEntity;
}
