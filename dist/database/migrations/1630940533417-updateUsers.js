"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsers1630940533417 = void 0;
class updateUsers1630940533417 {
    constructor() {
        this.name = 'updateUsers1630940533417';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }
}
exports.updateUsers1630940533417 = updateUsers1630940533417;
