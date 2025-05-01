import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { AddCityRequest } from './requests';
import { City } from 'src/database';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  addCity(@Body() dto: AddCityRequest): Promise<City> {
    return this.cityService.addCity(dto);
  }
}
