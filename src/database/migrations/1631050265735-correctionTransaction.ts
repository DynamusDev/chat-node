import {MigrationInterface, QueryRunner} from "typeorm";

export class correctionTransaction1631050265735 implements MigrationInterface {
    name = 'correctionTransaction1631050265735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
    }

}
