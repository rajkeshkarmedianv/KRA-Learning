/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuditFieldsToUsers1767549628249
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN created_at TIMESTAMP DEFAULT now(),
      ADD COLUMN updated_at TIMESTAMP DEFAULT now(),
      ADD COLUMN created_by INTEGER,
      ADD COLUMN updated_by INTEGER,
      ADD COLUMN is_active BOOLEAN DEFAULT true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN IF EXISTS is_active,
      DROP COLUMN IF EXISTS updated_by,
      DROP COLUMN IF EXISTS created_by,
      DROP COLUMN IF EXISTS updated_at,
      DROP COLUMN IF EXISTS created_at
    `);
  }
}
