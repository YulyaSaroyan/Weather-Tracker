import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.entity";
import { BaseEntity } from "./base.entity";

@Entity('weather-trackings')
export class WeatherTracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => City, { onDelete: 'CASCADE' })
  city: City;

  @Column({ type: 'timestamptz' })
  fetchedAt: Date;

  @Column('float')
  temperature: number;

  @Column('float')
  windspeed: number;
}

export const WEATHER_TRACKING_REPOSITORY = 'WEATHER_TRACKING_REPOSITORY';