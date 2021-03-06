import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";

import { Expose, Exclude } from 'class-transformer';

import Course from "@modules/course/infra/typeorm/entities/Course";
@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Expose({ name: 'course' })
    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course_id: string;

    @Column('date')
    birth_date: Date;

    @Column('boolean')
    isAdmin: boolean;

    @Column('boolean')
    approved: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null
        }
        
        return `http://localhost:3333/files/${this.avatar}`;  
    }
}

export default User;