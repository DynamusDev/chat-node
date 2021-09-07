"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsTable1631044521042 = void 0;
class transactionsTable1631044521042 {
    constructor() {
        this.name = 'transactionsTable1631044521042';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "category" character varying NOT NULL, "amount" character varying NOT NULL, "createdAt" date NOT NULL, "userId" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }
}
exports.transactionsTable1631044521042 = transactionsTable1631044521042;
