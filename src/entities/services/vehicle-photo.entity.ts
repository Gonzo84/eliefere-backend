import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { VehicleDetailsEntity } from './vehicle-details.entity';

@Entity('vehicle-photos')
@Index('index_vehicle_photo_details_id', ['detailsId'])
export class VehiclePhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  detailsId: number;

  @Column()
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => VehicleDetailsEntity, (details) => details.photos)
  details: VehicleDetailsEntity;
}
