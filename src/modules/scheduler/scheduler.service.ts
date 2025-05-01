import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  constructor(
    private readonly weatherService: WeatherService
  ) { }

  @Cron('*/10 * * * *')
  async fetchWeatherForTrackedCities() {
    this.logger.log("Fetching Weather");
    await this.weatherService.fetchWeatherForTrackedCities();
    this.logger.log("Fetching Weather Done");
  }
}
