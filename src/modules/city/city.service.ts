import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { City, CITY_REPOSITORY } from 'src/database';
import { Repository } from 'typeorm';
import { AddCityRequest } from './requests';

@Injectable()
export class CityService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CITY_REPOSITORY)
    private cityRepository: Repository<City>,
  ) { }

  async addCity(dto: AddCityRequest): Promise<City> {
    const existing = await this.cityRepository.findOneBy({ name: dto.city });
    if (existing) return existing;

    const coords = await this.getCoordinates(dto.city);
    return this.cityRepository.save({ name: dto.city, ...coords });
  }

  public async getCoordinates(cityName: string) {
    const url = `${this.configService.get<string>('WEATHER_GEO_API')}/search?name=${encodeURIComponent(cityName)}&count=1`;
    const res = await lastValueFrom(this.httpService.get(url));

    const location = res.data.results?.[0];
    if (!location) throw new NotFoundException('City not found');

    return {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  public async getCities(skip: number, take: number): Promise<City[]> {
    const cities = await this.cityRepository.find({ skip, take })
    return cities;
  }

  public getCityByName(name: string): Promise<City> {
    return this.cityRepository.findOneBy({ name });
  }
}
