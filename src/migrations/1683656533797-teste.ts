import { MigrationInterface, QueryRunner } from "typeorm";

export class Teste1683656533797 implements MigrationInterface {
    name = 'Teste1683656533797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "createAt" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "createdAt" TO "createAt"`);
    }

}
