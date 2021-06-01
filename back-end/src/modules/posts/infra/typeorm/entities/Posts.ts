import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

import { Exclude, Expose } from "class-transformer";

@Entity('posts')
class Posts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User | string;

    @Column()
    title: string;

    @Column()
    @Exclude()
    post_img: string;
    
    @Column('int')
    like: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'post_url' })
    getAvatarUrl(): string | null {
        if (!this.post_img) {
            return null
        }
        
        return `http://localhost:3333/files/${this.post_img}`;  
    }
}

export default Posts;