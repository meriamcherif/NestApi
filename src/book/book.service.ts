import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Book} from "./entities/book.entity";
import {CreateBookDto} from "./dto/create-book.dto";
import {AuthorService} from "../author/author.service";
import {UpdateBookDto} from "./dto/update-book.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        private readonly authorService: AuthorService,
    ) {
    }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find({
            relations: ['authors']
        });
    }

    async findById(id: number): Promise<Book> {
        const book = (await this.bookRepository.find({where: {id: id}, relations: ['authors']}))[0];
        if (book == null) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }

    async search(options: { title?: string, ISBN?: string; lastName?: string; minPrice?: number; maxPrice?: number, author?: string }): Promise<Book[]> {
        const queryBuilder = this.bookRepository.createQueryBuilder('book');
        queryBuilder.innerJoin('book.authors', 'author');
        if (options.title) {
            queryBuilder.andWhere('LOWER(book.title) LIKE LOWER(:title)', {title: `%${options.title}%`});
        }
        if (options.ISBN) {
            queryBuilder.andWhere('LOWER(book.ISBN) LIKE LOWER(:isbn)', {isbn: `%${options.ISBN}%`});
        }
        if (options.minPrice) {
            queryBuilder.andWhere('book.price >= :minPrice', {minPrice: options.minPrice});
        }
        if (options.maxPrice) {
            queryBuilder.andWhere('book.price <= :maxPrice', {maxPrice: options.maxPrice});
        }

        if (options.author) {
            queryBuilder.andWhere(
                `LOWER(author.firstName) LIKE LOWER(:author) OR LOWER(author.lastName) LIKE LOWER(:author)`,
                {author: `%${options.author}%`},
            );
        }
        return queryBuilder.getMany();
    }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = new Book();
        try {
            const author = await this.authorService.findById(createBookDto.authorId);
            book.authors = [author];
        } catch (e) {
            throw new NotFoundException(`Author with id ${createBookDto.authorId} not found`);
        }
        book.title = createBookDto.title;
        book.price = createBookDto.price;
        book.ISBN = createBookDto.ISBN;
        book.publicationDate = createBookDto.publicationDate;
        return await this.bookRepository.save(book);
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findById(id);
        if (updateBookDto.title)
            book.title = updateBookDto.title;
        if (updateBookDto.price)
            book.price = updateBookDto.price;
        if (updateBookDto.ISBN)
            book.ISBN = updateBookDto.ISBN;
        if (updateBookDto.publicationDate)
            book.publicationDate = updateBookDto.publicationDate;
        return await this.bookRepository.save(book);
    }

    async remove(id: number): Promise<Book> {
        const book = await this.findById(id);
        await this.bookRepository.softRemove(book);
        return book;
    }
}
