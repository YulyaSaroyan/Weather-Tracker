import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetRawWeatherTrackingsRequest } from './requests';
import { WeatherTrackingAverageResponse, WeatherTrackingResponse } from './responses';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @Get('raw')
  getRawWeatherTrackings(
    @Query() query: GetRawWeatherTrackingsRequest
  ): Promise<WeatherTrackingResponse[]> {
    return this.weatherService.getRawWeatherTrackings(query);
  }

  @Get('average')
  getWeatherTrackingAverage(
    @Query() query: GetRawWeatherTrackingsRequest
  ): Promise<WeatherTrackingAverageResponse> {
    return this.weatherService.getWeatherTrackingAverage(query);
  }
}
