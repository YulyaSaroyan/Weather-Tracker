import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [
    WeatherModule,
    ScheduleModule.forRoot(),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
