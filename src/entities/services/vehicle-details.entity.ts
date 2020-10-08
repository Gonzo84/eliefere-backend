import {
  Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn, Unique,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { VehiclePhotoEntity } from './vehicle-photo.entity';
// eslint-disable-next-line import/no-cycle
import { ServiceClassEntity } from './service-class.entity';

@Entity('vehicle-details')
@Unique('unique_vehicle_details_id', ['service_id'])
@Index('index_vehicle_details_id', ['service_id'])
export class VehicleDetailsEntity {
  @PrimaryColumn()
  service_id: number;

  @Column()
  verified: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => ServiceClassEntity, (sc) => sc.details)
  @JoinColumn({ name: 'service_id' })
  service: ServiceClassEntity;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => VehiclePhotoEntity, (photo) => photo.details)
  photos: VehiclePhotoEntity[];
}
