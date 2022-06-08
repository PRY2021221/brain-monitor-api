/* eslint-disable require-await */
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../config-env/config';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [],
    inject: [config.KEY],
    async useFactory(configService: ConfigType<typeof config>) {
      let hasSsl : any= { rejectUnauthorized: false };
      let configAdd : any= {url: configService.database.urlLink };
      if(process.env.NODE_ENV === 'dev'){
        hasSsl = false;
        configAdd = {
          host: configService.database.host,
          username: configService.database.user,
          password: configService.database.password,
          database: configService.database.name
        };
      }
      return {
        ssl: hasSsl,
        type: 'postgres',
        ...configAdd,
        entities: [`${process.cwd()}/dist/**/*.entity{.ts,.js}`],
        migrations: [`${process.cwd()}/dist/database/migrations/*{.ts,.js}`],

      } as ConnectionOptions;
    },
  }),
];
