import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

import { Expose, Exclude } from 'class-transformer';

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

    /* @OneToMany()
    course_id: Curse; */

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