"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.correctionTransaction1631050265735 = void 0;
class correctionTransaction1631050265735 {
    constructor() {
        this.name = 'correctionTransaction1631050265735';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "type" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
    }
}
exports.correctionTransaction1631050265735 = correctionTransaction1631050265735;
