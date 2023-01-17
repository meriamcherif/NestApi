import {Column, CreateDateColumn, DeleteDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Exclude} from "class-transformer";

export class ShoppingCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @ManyToOne(() => User)
    user: User;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;
}
