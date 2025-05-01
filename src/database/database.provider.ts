import { DataSource } from 'typeorm';
import { City, CITY_REPOSITORY, entities, WEATHER_TRACKING_REPOSITORY, WeatherTracking } from './entities';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const dataSourceName = 'DATA_SOURCE';

export const databaseProviders = [
  {
    provide: dataSourceName,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities,
        migrations: [join(__dirname, 'migrations/*.{ts,js}')],
        migrationsRun: true, 
        migrationsTransactionMode: 'none',
        synchronize: false,
      });
      await dataSource.initialize();
      return dataSource;
    },
    inject: [ConfigService]
  },
];

export const cityProviders = [
  {
    provide: CITY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(City),
    inject: [dataSourceName],
  },
];

export const weatherTrackingProviders = [
  {
    provide: WEATHER_TRACKING_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(WeatherTracking),
    inject: [dataSourceName],
  },
];

