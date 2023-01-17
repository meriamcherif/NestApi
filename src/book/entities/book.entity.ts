import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Author} from "../../author/entities/author.entity";
import {Exclude, Type} from "class-transformer";
import { Book_card } from 'src/book_card/entities/book_card.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    ISBN: string;

    @Column()
    publicationDate: Date;

    @Column()
    price: number;

    @ManyToMany(type => Author)
    @JoinTable()
    @Type(() => Author)
    authors: Author[];

    @OneToMany(() => Book_card, (book_card) => book_card.book_id)
    book_cards: Book_card[]

    
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