import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { PartnerEntity } from '..';
// eslint-disable-next-line import/no-cycle
import { VehicleDetailsEntity } from './vehicle-details.entity';

@Entity('service-class')
@Index('index_service_class_type_of_service', ['type_of_service'])
export class ServiceClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
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
