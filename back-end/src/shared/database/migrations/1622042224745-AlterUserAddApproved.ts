import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserAddApproved1622042224745 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'approved',
                type: 'boolean',
                default: false
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'approved');
    }
}
