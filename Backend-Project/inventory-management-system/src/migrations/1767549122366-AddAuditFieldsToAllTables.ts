/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditFieldsToAllTables1767549122366 implements MigrationInterface {
    name = 'AddAuditFieldsToAllTables1767549122366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updated_by" integer`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP COLUMN "created_at"`);
        
    }

}
