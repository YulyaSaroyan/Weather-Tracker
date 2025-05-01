import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('cities')
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;
}

export const CITY_REPOSITORY = 'CITY_REPOSITORY';