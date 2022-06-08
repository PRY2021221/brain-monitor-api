/* eslint-disable no-param-reassign */

export class ImageHandler {

  public static getMagneticResonanceUrl(filename: string) {
    const magneticResonanceUrlApi = `${process.env.BASE_URL}/image/magnetic-resonance`;
    if (!filename) return '';
    const [name, extension] = filename.split('.');
    const basePath = magneticResonanceUrlApi;
    const filePath = `${basePath}?filename=${name}&extension=${extension}`;

    return filePath;
  }

}
