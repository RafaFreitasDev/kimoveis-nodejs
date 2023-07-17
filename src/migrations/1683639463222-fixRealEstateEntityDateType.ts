import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRealEstateEntityDateType1683639463222 implements MigrationInterface {
    name = 'FixRealEstateEntityDateType1683639463222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "createAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "updatedAt" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
