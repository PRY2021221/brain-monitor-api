/* eslint-disable require-await */
import {
  Controller, Get, Query, Res,
} from '@nestjs/common';
import { CustomLoggerService } from '../logger/custom-logger.service';

@Controller('image')
export class ImageController {
  private readonly logger = new CustomLoggerService(ImageController.name);

    @Get('magnetic-resonance')
  async getImageByName(@Query('filename')filename: string,@Query('extension')extension: string, @Res() res) {
    this.logger.log(`${process.cwd()}/public/magnetic-resonance`, filename, extension);

    return res.sendFile(`${filename}.${extension}`, { root: `${process.cwd()}/public/magnetic-resonance` });
  }
}
