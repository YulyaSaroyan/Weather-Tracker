import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { WEATHER_TRACKING_REPOSITORY, WeatherTracking } from 'src/database';
import { Between, Repository } from 'typeorm';
import { CityService } from '../city/city.service';
import { GetRawWeatherTrackingsRequest } from './requests';
import { RawTrackingAverage, WeatherTrackingResponse } from './responses';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly citySerice: CityService,
    @Inject(WEATHER_TRACKING_REPOSITORY)
    private weatherTrackingRepository: Repository<WeatherTracking>,
  ) { }

  async getRawWeatherTrackings(
    dto: GetRawWeatherTrackingsRequest
  ): Promise<WeatherTrackingResponse[]> {
    const city = await this.citySerice.getCityByName(dto.city);
    if (!city) throw new NotFoundException('City not found');

    return this.weatherTrackingRepository.find({
      where: {
        city: { id: city.id },
        fetchedAt: Between(new Date(dto.from), new Date(dto.to)),
      },
      order: { fetchedAt: 'ASC' },
      select: ['fetchedAt', 'temperature', 'windspeed'],
    });
  }

  async getWeatherTrackingAverage(dto: GetRawWeatherTrackingsRequest) {
    const city = await this.citySerice.getCityByName(dto.city);
    if (!city) throw new NotFoundException('City not found');

    const tracking: RawTrackingAverage = await this.weatherTrackingRepository
      .createQueryBuilder('tarcking')
      .select('AVG(tarcking.temperature)', 'avgTemp')
      .addSelect('AVG(tarcking.windspeed)', 'avgWind')
      .addSelect('COUNT(*)', 'count')
      .where('tarcking.cityId = :cityId', { cityId: city.id })
      .andWhere('tarcking.fetchedAt BETWEEN :from AND :to', {
        from: dto.from,
        to: dto.to,
      })
      .getRawOne();

    return {
      ...dto,
      count: parseInt(tracking.count, 10),
      averageTemperature: parseFloat(tracking.avgTemp),
      averageWindspeed: parseFloat(tracking.avgWind),
    };
  }

  public async fetchWeatherForTrackedCities() {
    let skip = 0;
    let take = 10;
    let hasMore = true;

    while (hasMore) {
      const cities = await this.citySerice.getCities(skip, take);
      if (!cities.length) break;

      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const current = await this.fetchWeather(city.latitude, city.longitude);

            const weatherTracking = new WeatherTracking();
            weatherTracking.city = city;
            weatherTracking.fetchedAt = new Date(current.time);
            weatherTracking.temperature = current.temperature;
            weatherTracking.windspeed = current.windspeed;

            return weatherTracking;
          } catch (error) {
            this.logger.error(`Failed for city ${city.name}`, error);
            return null;
          }
        })
      );

      await this.weatherTrackingRepository.save(results.filter(Boolean));

      hasMore = !!cities.length;
      skip += 10;
    }
  }

  private async fetchWeather(latitude: number, longitude: number) {
    const url = `${this.configService.get<string>('WEATHER_API')}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const res = await lastValueFrom(this.httpService.get(url));
    return res.data.current_weather;
  }
}
