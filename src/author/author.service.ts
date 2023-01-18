import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateAuthorDto} from './dto/create-author.dto';
import {UpdateAuthorDto} from './dto/update-author.dto';
import {Author} from "./entities/author.entity";

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {
    }

    async findById(id: number): Promise<Author> {
        const author = (await this.authorRepository.find({where: {id: id}, relations: ['books']}))[0];
        if (author == null) {
            throw new NotFoundException(`Author with id ${id} not found`);
        }
        return author;
    }

    async findAll(): Promise<Author[]> {
        return this.authorRepository.find({relations: ['books']});
    }

    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = new Author();
        author.firstName = createAuthorDto.firstName;
        author.lastName = createAuthorDto.lastName;
        return this.authorRepository.save(author);
    }

    async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const author = await this.findById(id);
        author.firstName = updateAuthorDto.firstName;
        author.lastName = updateAuthorDto.lastName;
        return this.authorRepository.save(author);
    }

    async remove(id: number): Promise<Author> {
        const author = await this.findById(id);
        await this.authorRepository.softRemove(author);
        return author;
    }
}
