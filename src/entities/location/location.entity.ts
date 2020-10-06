import {
  Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, Unique,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Partner } from '..';
import { LocationModel } from '../../contract';

@Entity('locations')
@Unique('unique_partner_location_id', ['partnerId'])
@Index('index_partner_location_id', ['partnerId'])
export class Location {
  @PrimaryColumn()
  partnerId: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: LocationModel;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Partner, (partner) => partner.id)
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;
}
