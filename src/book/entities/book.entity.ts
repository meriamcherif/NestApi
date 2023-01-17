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