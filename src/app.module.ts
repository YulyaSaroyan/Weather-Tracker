import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';
import { CityModule } from './modules/city/city.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { DatabaseModule } from './database';

@Module({
  imports: [
    DatabaseModule,
    WeatherModule,
    CityModule,
    SchedulerModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class AppModule { }
