import {
  Column,
  Entity, Index, Unique,
} from 'typeorm';
import { Partner as IPartner } from '../../contract';
import { BaseEntity } from './base.entity';
import { ILocation } from '../../contract/interfaces/location.interface';

@Entity('partners')
@Unique('unique_partner_username', ['username'])
@Unique('unique_partner_email', ['email'])
@Index('index_partner_username', ['username'])
@Index('index_partner_email', ['email'])
export class Partner extends BaseEntity implements IPartner {
  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: ILocation;
}
