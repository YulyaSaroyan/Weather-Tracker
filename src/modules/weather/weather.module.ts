import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { weatherTrackingProviders } from 'src/database';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';

@Module({
  imports: [HttpModule.register({ timeout: 5000 }), CityModule],
  controllers: [WeatherController],
  providers: [WeatherService, ...weatherTrackingProviders],
  exports: [WeatherService]
})
export class WeatherModule {}
