import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Shopping_card} from "../../shopping_card/entities/shopping_card.entity";
import {Book} from "../../book/entities/book.entity";
import {Exclude, Type} from "class-transformer";

@Entity()
export class Book_card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: string;

    @ManyToOne(() => Book, (book) => book.id)
    book_id: Book
    
    @ManyToOne(() => Shopping_card, (shopping_card) => shopping_card.id)
    shopping_card_id: Shopping_card

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