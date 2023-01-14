import {NestFactory} from '@nestjs/core';
import {AppModule} from '../app.module';

import {randAlphaNumeric, randBook, randFirstName, randLastName, randNumber, randPastDate,} from '@ngneat/falso';
import {AuthorService} from "../author/author.service";
import {BookService} from "../book/book.service";
import {CreateAuthorDto} from "../author/dto/create-author.dto";
import {CreateBookDto} from "../book/dto/create-book.dto";

const numAuthors = 10;
const numBooks = 100;

// Generate an array of fake authors
const generateAuthors = (
    numAuthors: number): CreateAuthorDto[] => {
    const authors: CreateAuthorDto[] = [];
    for (let i = 0; i < numAuthors; i++) {
        const author = new CreateAuthorDto();
        author.firstName = randFirstName()
        author.lastName = randLastName()
        authors.push(author);
    }
    return authors;
};

// Generate an array of fake books, with random authors
const generateBooks = (numBooks: number, authorsIds: number[]): CreateBookDto[] => {
    const books: CreateBookDto[] = [];
    for (let i = 0; i < numBooks; i++) {
        const book = new CreateBookDto();
        book.title = randBook().title;
        book.ISBN = randAlphaNumeric({length:10}).join('').toUpperCase();
        book.price = randNumber({min: 10, max: 50});
        book.authorId = authorsIds[randNumber({min: 0, max: authorsIds.length - 1})];
        book.publicationDate = randPastDate();
        books.push(book);
    }
    return books;
};

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const authorService = app.get(AuthorService);
    const bookService = app.get(BookService);

    const authors = generateAuthors(numAuthors);
    let authorIds: number[] = [];
    for (const author of authors) {
        authorIds.push((await authorService.create(author)).id);
    }
    const books = generateBooks(numBooks, authorIds);
    for (const book of books) {
        await bookService.create(book);
    }

    await app.close();
}

bootstrap();
