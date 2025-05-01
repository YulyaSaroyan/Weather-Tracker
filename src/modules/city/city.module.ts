import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { cityProviders } from 'src/database';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ timeout: 5000 })],
  controllers: [CityController],
  providers: [CityService, ...cityProviders],
  exports: [CityService]
})
export class CityModule {}
