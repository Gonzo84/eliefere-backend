import {
  Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, Unique,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { PartnerEntity } from '..';
import { LocationModel } from '../../contract';

@Entity('locations')
@Unique('unique_partner_location_id', ['partnerId'])
@Index('index_partner_location_id', ['partnerId'])
export class LocationEntity {
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
  @OneToOne((type) => PartnerEntity, (partner) => partner.id)
  @JoinColumn({ name: 'partnerId' })
  partner: PartnerEntity;
}
