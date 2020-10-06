import {
  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { VehiclePhotoEntity } from './vehicle-photo.entity';
// eslint-disable-next-line import/no-cycle
import { ServiceClassEntity } from './service-class.entity';

@Entity('vehicle-details')
export class VehicleDetailsEntity {
  @PrimaryColumn()
  serviceId: number;

  @Column()
  verified: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => ServiceClassEntity, (sc) => sc.details)
  @JoinColumn({ name: 'serviceId' })
  service: ServiceClassEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => VehiclePhotoEntity, (photo) => photo.details)
  photos: VehiclePhotoEntity[];
}
