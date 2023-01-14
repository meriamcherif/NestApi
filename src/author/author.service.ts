import {Injectable} from '@nestjs/common';
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
        return this.authorRepository.findOneBy({id: id});
    }
    async findAll(): Promise<Author[]> {
        return this.authorRepository.find();
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

    async remove(id: number): Promise<void> {
        await this.authorRepository.softDelete(id);
    }
}
