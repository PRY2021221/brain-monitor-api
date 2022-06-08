import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserEntity1650704505954 implements MigrationInterface {
    name = 'UpdateUserEntity1650704505954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "dni" character varying(8) DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(100) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tuition" character varying(100) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ADD "speciality" character varying(100) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('A', 'D')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'D'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('A', 'U')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'U'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "speciality"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tuition"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dni"`);
    }

}
