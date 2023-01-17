import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Exclude, Type} from "class-transformer";
import { Book_card } from 'src/book_card/entities/book_card.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Shopping_card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @OneToMany(() => Book_card, (book_card) => book_card.shopping_card_id)
    book_cards: Book_card[]


    @ManyToMany(type => User)
    @JoinTable()
    @Type(() => User)
    authors: User[];

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