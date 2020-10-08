import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { VehiclePhotoEntity } from './vehicle-photo.entity';
// eslint-disable-next-line import/no-cycle
import { ServiceClassEntity } from './service-class.entity';

@Entity('vehicle-details')
@Index('index_vehicle_details_service_id', ['service_id'])
export class VehicleDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  service_id: number;

  @IsBoolean()
  @Column('boolean', { default: false })
  verified: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => ServiceClassEntity, (sc) => sc.details)
  @JoinColumn({ name: 'service_id' })
  service: ServiceClassEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => VehiclePhotoEntity, (photo) => photo.details)
  photos: VehiclePhotoEntity[];
}
