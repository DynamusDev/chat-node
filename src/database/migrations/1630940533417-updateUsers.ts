import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUsers1630940533417 implements MigrationInterface {
    name = 'updateUsers1630940533417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
