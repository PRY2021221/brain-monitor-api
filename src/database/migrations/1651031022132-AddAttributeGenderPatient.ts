import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAttributeGenderPatient1651031022132 implements MigrationInterface {
    name = 'AddAttributeGenderPatient1651031022132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignment_requests" RENAME COLUMN "priorization_type" TO "prioritization_type"`);
        await queryRunner.query(`ALTER TYPE "public"."assignment_requests_priorization_type_enum" RENAME TO "assignment_requests_prioritization_type_enum"`);
        await queryRunner.query(`ALTER TABLE "medical_histories" RENAME COLUMN "priorization_type" TO "prioritization_type"`);
        await queryRunner.query(`ALTER TYPE "public"."medical_histories_priorization_type_enum" RENAME TO "medical_histories_prioritization_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."patients_gender_enum" AS ENUM('M', 'F', 'N')`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "gender" "public"."patients_gender_enum" NOT NULL DEFAULT 'N'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."patients_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."medical_histories_prioritization_type_enum" RENAME TO "medical_histories_priorization_type_enum"`);
        await queryRunner.query(`ALTER TABLE "medical_histories" RENAME COLUMN "prioritization_type" TO "priorization_type"`);
        await queryRunner.query(`ALTER TYPE "public"."assignment_requests_prioritization_type_enum" RENAME TO "assignment_requests_priorization_type_enum"`);
        await queryRunner.query(`ALTER TABLE "assignment_requests" RENAME COLUMN "prioritization_type" TO "priorization_type"`);
    }

}
