import {Column, CreateDateColumn, DeleteDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Book} from "../../book/entities/book.entity";
import {Exclude} from "class-transformer";
import {ShoppingCard} from "../../shopping-card/entities/shopping-card.entity";

export class BookOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: string;

    @ManyToOne(() => Book)
    book: Book;

    @ManyToOne(() => ShoppingCard)
    shoppingCard: ShoppingCard;

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
