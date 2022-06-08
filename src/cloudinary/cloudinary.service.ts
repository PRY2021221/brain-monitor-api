/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async uploadImage(
       filePath: string,
       folder: string
      ){
        return v2.uploader.upload(filePath, {
            folder,
        });
      }

    async deleteImage(publicId: string){
        return v2.uploader.destroy(publicId);
    }
}
