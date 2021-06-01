import {MigrationInterface, QueryRunner} from "typeorm";

export default class SeedCourse1621899990539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.createQueryBuilder()
            .insert().into('courses')
            .values([
                { course: 'Administração', time_course: 8 },
                { id: 'da1d1fd8-70b3-4d8f-85a5-c44d3a357ab2', course: 'Análise Desenvolvimento De Sistema', time_course: 5 },
                { course: 'Arquitetura e Urbanismo', time_course: 10 },
                { course: 'Biomedicina', time_course: 8 },
                { course: 'Ciências Contábeis', time_course: 8 },
                { course: 'Comércio Exterior', time_course: 4 },
                { course: 'Direito', time_course: 10 },
                { course: 'Engenharia Civil', time_course: 10 },
                { course: 'Engenharia De Produção', time_course: 10 },
                { course: 'Engenharia Mecânica', time_course: 10 },
                { course: 'Estética e Cosmética', time_course: 6 },
                { course: 'Fisioterapia', time_course: 10 },
                { course: 'Gestão de Recursos Humanos', time_course: 4 },
                { course: 'Gestão Financeira', time_course: 4 },
                { course: 'Logística', time_course: 4 },
                { course: 'Marketing', time_course: 4 },
                { course: 'Medicina Veterinária', time_course: 10 },
                { course: 'Nutrição', time_course: 8 },
                { course: 'Processos Gerencias', time_course: 4 },
                { course: 'Psicologia', time_course: 10 },
                { course: 'Publicidade e Propaganda', time_course: 8 },
            ]).execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses');
    }

}
