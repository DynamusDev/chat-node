import {MigrationInterface, QueryRunner} from "typeorm";

export class roomTable1616762205083 implements MigrationInterface {
    name = 'roomTable1616762205083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "map" character varying NOT NULL, "capacity" double precision NOT NULL, "createdAt" date NOT NULL, "updatedAt" date, "deletedAt" date, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_players_users" ("roomsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_d52dac580c74afa932580d1cd0b" PRIMARY KEY ("roomsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2e2037c57890e9b6b1919b9f97" ON "rooms_players_users" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e334644b7c05acdbfc0b93de59" ON "rooms_players_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rooms_players_users" ADD CONSTRAINT "FK_2e2037c57890e9b6b1919b9f978" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_players_users" ADD CONSTRAINT "FK_e334644b7c05acdbfc0b93de596" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_players_users" DROP CONSTRAINT "FK_e334644b7c05acdbfc0b93de596"`);
        await queryRunner.query(`ALTER TABLE "rooms_players_users" DROP CONSTRAINT "FK_2e2037c57890e9b6b1919b9f978"`);
        await queryRunner.query(`DROP INDEX "IDX_e334644b7c05acdbfc0b93de59"`);
        await queryRunner.query(`DROP INDEX "IDX_2e2037c57890e9b6b1919b9f97"`);
        await queryRunner.query(`DROP TABLE "rooms_players_users"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
    }

}
