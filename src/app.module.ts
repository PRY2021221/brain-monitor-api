import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UbigeoModule } from './ubigeo/ubigeo.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { PatientModule } from './patient/patient.module';
import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config-env/config';
import { enviroments } from './config-env/enviroments';
import { DatabaseModule } from './database/database.module';
import { CustomLoggerModule } from './logger/custom-logger.module';
import { MailModule } from './mail/mail.module';
import { ImageModule } from './image-module/image-module.module';

@Module({
  imports: [
    CloudinaryModule,
    UbigeoModule,
    PatientModule,
    MedicalHistoryModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.dev.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number(),
        // API_KEY: Joi.number().required(),
        // DATABASE_NAME: Joi.string().required(),
        // DATABASE_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    MailModule,
    CustomLoggerModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    AppModule.port = parseInt(this.configService.port);
    console.log(process.cwd());
  }
}
