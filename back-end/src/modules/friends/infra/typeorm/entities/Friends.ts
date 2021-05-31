import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

@Entity('friends')
class Friends {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User | string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'friend_id' })
    friend: User | string;

    @Column('bool')
    accept: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Friends;