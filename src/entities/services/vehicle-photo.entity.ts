import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { VehicleDetailsEntity } from './vehicle-details.entity';

@Entity('vehicle-photos')
export class VehiclePhotoEntity {
  @PrimaryGeneratedColumn()
  detailsId: number;

  @Column()
  url: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => VehicleDetailsEntity, (details) => details.photos)
  details: VehicleDetailsEntity;
}
