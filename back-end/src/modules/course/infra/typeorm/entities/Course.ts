import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";

@Entity('courses')
class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    course: string;

    @Column()
    time_course: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Course;