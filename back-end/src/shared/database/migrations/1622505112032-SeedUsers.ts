import { hash } from 'bcryptjs';
import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedUsers1622505112032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .insert().into('users')
            .values([
                { 
                    name: 'Joao Uriel', 
                    username: 'joaouriel',
                    password: await hash('joaouriel', 8),
                    email: 'joaouriel@teste.com',
                    avatar: '',
                    course_id: 'da1d1fd8-70b3-4d8f-85a5-c44d3a357ab2',
                    birth_date: '1999-07-17 00:00:00',
                    isAdmin: true,
                    approved: true
                },
                {
                    name: 'Ariana Grande', 
                    username: 'grandeArianaOficial',
                    password: await hash('ariana123', 8),
                    email: 'ariana.grande@gmail.com',
                    avatar: '',
                    course_id: 'da1d1fd8-70b3-4d8f-85a5-c44d3a357ab2',
                    birth_date: '1998-01-23 00:00:00',
                    isAdmin: true,
                    approved: true
                },
                {
                    name: 'Tiago Boriça', 
                    username: 'borica',
                    password: await hash('borica123', 8),
                    email: 'tiago.borica@bol.com',
                    avatar: '',
                    course_id: 'da1d1fd8-70b3-4d8f-85a5-c44d3a357ab2',
                    birth_date: '1997-02-04 00:00:00',
                    isAdmin: true,
                    approved: true
                }
            ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses');
    }

}
