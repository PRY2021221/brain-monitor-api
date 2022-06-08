import {MigrationInterface, QueryRunner} from "typeorm";

export class MedicalHistoryEntities1650831268249 implements MigrationInterface {
    name = 'MedicalHistoryEntities1650831268249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."assignment_requests_priorization_type_enum" AS ENUM('L', 'M', 'H', 'N')`);
        await queryRunner.query(`CREATE TYPE "public"."assignment_requests_assignment_status_enum" AS ENUM('A', 'I', 'N')`);
        await queryRunner.query(`CREATE TYPE "public"."assignment_requests_assignment_request_status_enum" AS ENUM('P', 'R', 'A')`);
        await queryRunner.query(`CREATE TABLE "assignment_requests" ("id" SERIAL NOT NULL, "priorization_type" "public"."assignment_requests_priorization_type_enum" NOT NULL DEFAULT 'N', "assignment_status" "public"."assignment_requests_assignment_status_enum" NOT NULL DEFAULT 'N', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "assignment_request_status" "public"."assignment_requests_assignment_request_status_enum" NOT NULL DEFAULT 'P', "medicalHistoryId" integer, CONSTRAINT "PK_25541092ea933af3891e225d58e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."magnetic_resonances_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "magnetic_resonances" ("id" SERIAL NOT NULL, "resonance_area_name" character varying(200) DEFAULT '', "resonance_image_link" character varying(500) DEFAULT '', "filename" character varying(100) DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."magnetic_resonances_status_enum" NOT NULL DEFAULT 'A', "medicalHistoryId" integer, CONSTRAINT "PK_47a438d5e1875240f1ef163e940" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."treatments_treatment_name_enum" AS ENUM('C', 'S', 'O')`);
        await queryRunner.query(`CREATE TYPE "public"."treatments_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "treatments" ("id" SERIAL NOT NULL, "treatment_name" "public"."treatments_treatment_name_enum" NOT NULL DEFAULT 'O', "observation" character varying(500) DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."treatments_status_enum" NOT NULL DEFAULT 'A', "medicalHistoryId" integer, CONSTRAINT "PK_133f26d52c70b9fa3c2dbb3c89e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_health_insurance_enum" AS ENUM('S', 'E', 'P', 'O', 'N')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_blood_type_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'U')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_responsible_relationship_enum" AS ENUM('M', 'F', 'H', 'S', 'O')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_priorization_type_enum" AS ENUM('L', 'M', 'H', 'N')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_assignment_status_enum" AS ENUM('A', 'I', 'N')`);
        await queryRunner.query(`CREATE TYPE "public"."medical_histories_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "medical_histories" ("id" SERIAL NOT NULL, "birth_place" character varying(200) DEFAULT '', "health_insurance" "public"."medical_histories_health_insurance_enum" NOT NULL DEFAULT 'N', "blood_type" "public"."medical_histories_blood_type_enum" NOT NULL DEFAULT 'U', "has_relative_with_cancer" boolean DEFAULT false, "weight" integer DEFAULT '0', "height" integer DEFAULT '0', "had_hospitalizations" boolean DEFAULT false, "had_transfusions" boolean DEFAULT false, "had_surgeries" boolean DEFAULT false, "have_allergies" boolean DEFAULT false, "existing_diseases" character varying(300) DEFAULT '', "responsible_name" character varying(100) DEFAULT '', "responsible_relationship" "public"."medical_histories_responsible_relationship_enum" NOT NULL DEFAULT 'O', "responsible_phone_number" character varying(12) DEFAULT '', "responsible_dni" character varying(8) DEFAULT '', "diagnosis_description" character varying(800) DEFAULT '', "treatment_description" character varying(800) DEFAULT '', "accuracy_percentage" numeric DEFAULT '0', "priorization_type" "public"."medical_histories_priorization_type_enum" NOT NULL DEFAULT 'N', "assignment_status" "public"."medical_histories_assignment_status_enum" NOT NULL DEFAULT 'N', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."medical_histories_status_enum" NOT NULL DEFAULT 'A', "patientId" integer, CONSTRAINT "PK_8b0170de8abb52639e20c046533" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."patients_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" SERIAL NOT NULL, "firstname" character varying(100) DEFAULT '', "first_lastname" character varying(100) DEFAULT '', "second_lastname" character varying(100) DEFAULT '', "registered_date" TIMESTAMP WITH TIME ZONE, "birth_date" TIMESTAMP WITH TIME ZONE, "hospital_name" character varying(200) DEFAULT '', "dni" character varying(8) DEFAULT '', "phone_number" character varying(9) DEFAULT '', "email" character varying(100) DEFAULT '', "ubigeo" character varying(6) DEFAULT '000000', "address" character varying(200) DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."patients_status_enum" NOT NULL DEFAULT 'A', "doctorId" integer, CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departments" ("id" character varying(2) NOT NULL DEFAULT '00', "name" character varying(100) DEFAULT '', CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "districts" ("id" character varying(6) NOT NULL DEFAULT '000000', "name" character varying(100) DEFAULT '', "department_id" character varying(2) DEFAULT '00', "province_id" character varying(4) DEFAULT '0000', CONSTRAINT "PK_b817cb25cd5a42fd3805756adb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provinces" ("id" character varying(4) NOT NULL DEFAULT '0000', "name" character varying(100) DEFAULT '', "department_id" character varying(2) DEFAULT '00', CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignment_requests" ADD CONSTRAINT "FK_543fa3c7ba90ff6a4482c32264e" FOREIGN KEY ("medicalHistoryId") REFERENCES "medical_histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" ADD CONSTRAINT "FK_352494484e712610c874cde672c" FOREIGN KEY ("medicalHistoryId") REFERENCES "medical_histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatments" ADD CONSTRAINT "FK_987f75fd4fc70be00adc22b6e66" FOREIGN KEY ("medicalHistoryId") REFERENCES "medical_histories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medical_histories" ADD CONSTRAINT "FK_97a7712fb95aef0ba080dad3577" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_c39435c71c0fff03449eb6b2332" FOREIGN KEY ("doctorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_c39435c71c0fff03449eb6b2332"`);
        await queryRunner.query(`ALTER TABLE "medical_histories" DROP CONSTRAINT "FK_97a7712fb95aef0ba080dad3577"`);
        await queryRunner.query(`ALTER TABLE "treatments" DROP CONSTRAINT "FK_987f75fd4fc70be00adc22b6e66"`);
        await queryRunner.query(`ALTER TABLE "magnetic_resonances" DROP CONSTRAINT "FK_352494484e712610c874cde672c"`);
        await queryRunner.query(`ALTER TABLE "assignment_requests" DROP CONSTRAINT "FK_543fa3c7ba90ff6a4482c32264e"`);
        await queryRunner.query(`DROP TABLE "provinces"`);
        await queryRunner.query(`DROP TABLE "districts"`);
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TYPE "public"."patients_status_enum"`);
        await queryRunner.query(`DROP TABLE "medical_histories"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_assignment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_priorization_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_responsible_relationship_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_blood_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."medical_histories_health_insurance_enum"`);
        await queryRunner.query(`DROP TABLE "treatments"`);
        await queryRunner.query(`DROP TYPE "public"."treatments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."treatments_treatment_name_enum"`);
        await queryRunner.query(`DROP TABLE "magnetic_resonances"`);
        await queryRunner.query(`DROP TYPE "public"."magnetic_resonances_status_enum"`);
        await queryRunner.query(`DROP TABLE "assignment_requests"`);
        await queryRunner.query(`DROP TYPE "public"."assignment_requests_assignment_request_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."assignment_requests_assignment_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."assignment_requests_priorization_type_enum"`);
    }

}
