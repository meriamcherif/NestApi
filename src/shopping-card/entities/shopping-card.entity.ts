import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Exclude} from "class-transformer";
import {Book} from "../../book/entities/book.entity";

@Entity()
export class ShoppingCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @ManyToOne(() => User)
    user: User;


    @ManyToMany(() => Book)
    @JoinTable()
    books: Book[];

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
