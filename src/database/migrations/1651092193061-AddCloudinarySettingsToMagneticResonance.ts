import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCloudinarySettingsToMagneticResonance1651092193061 implements MigrationInterface {
    name = 'AddCloudinarySettingsToMagneticResonance1651092193061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" ADD "cloudinary_public_id" character varying(300) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" ADD "cloudinary_version_id" character varying(300) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" ADD "cloudinary_folder" character varying(300) DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" DROP COLUMN "cloudinary_folder"`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" DROP COLUMN "cloudinary_version_id"`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" DROP COLUMN "cloudinary_public_id"`);
    }

}
