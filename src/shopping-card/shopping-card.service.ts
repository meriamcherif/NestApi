import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateShoppingCardDto} from './dto/create-shopping-card.dto';
import {ShoppingCard} from "./entities/shopping-card.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import {BookService} from "../book/book.service";

@Injectable()
export class ShoppingCardService {

    constructor(
        @InjectRepository(ShoppingCard)
        private readonly shoppingCardRepository: Repository<ShoppingCard>,
        private readonly userService: UserService,
        private readonly bookService: BookService,
    ) {
    }

    async create(createShoppingCardDto: CreateShoppingCardDto): Promise<ShoppingCard> {
        const shoppingCard = new ShoppingCard();
        try {
            shoppingCard.user = await this.userService.findById(createShoppingCardDto.userId);
        } catch (e) {
            throw new NotFoundException(`User with id ${createShoppingCardDto.userId} not found`);
        }
        shoppingCard.books = [];
        for (const bookId of createShoppingCardDto.booksId) {
            try {
                const book = await this.bookService.findById(bookId);
                shoppingCard.books.push(book);
            } catch (e) {
                throw new NotFoundException(`Book with id ${bookId} not found`);
            }
        }
        // shoppingCard.books = books;
        shoppingCard.status = "PROGRESS";
        return await this.shoppingCardRepository.save(shoppingCard);
    }

    async findAll() {
        return await this.shoppingCardRepository.find({
            relations: ['books', 'user']
        });
    }

    async findById(id: number): Promise<ShoppingCard> {
        const shoppingCard = (await this.shoppingCardRepository.find({where: {id: id}, relations: ['books']}))[0];
        if (shoppingCard == null) {
            throw new NotFoundException(`Shopping card with id ${id} not found`);
        }
        return shoppingCard;
    }

    async addBookToShoppingCard(shoppingCardId: number, bookId: number) {
        const shoppingCard = await this.findById(shoppingCardId);
        const book = await this.bookService.findById(bookId);
        shoppingCard.books.push(book);
        return await this.shoppingCardRepository.save(shoppingCard);
    }

    async addBooksToShoppingCard(shoppingCardId: number, booksId: number[]) {
        let shoppingCard = await this.findById(shoppingCardId);
        for (const bookId of booksId) {
            shoppingCard = await this.addBookToShoppingCard(shoppingCard.id, bookId);
        }
        return shoppingCard;
    }

    async order(id: number) {
        const shoppingCard = await this.findById(id);
        shoppingCard.status = "ORDERED";
        return await this.shoppingCardRepository.save(shoppingCard);
    }

    async cancel(id: number) {
        const shoppingCard = await this.findById(id);
        shoppingCard.status = "CANCELED";
        return await this.shoppingCardRepository.save(shoppingCard);
    }

    async remove(id: number) {
        return await this.shoppingCardRepository.softDelete(id);
    }
}
