import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {Author} from "../../author/entities/author.entity";
import {Type} from "class-transformer";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}