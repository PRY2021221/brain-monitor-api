import { Module } from '@nestjs/common';
import { CustomLoggerModule } from '../logger/custom-logger.module';
import { ImageController } from './image.controller';

@Module({
  imports: [
    CustomLoggerModule,
  ],
  controllers: [ImageController],
  providers: [],
  exports: [],
})
export class ImageModule {}
