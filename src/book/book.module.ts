import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import {AuthorModule} from "../author/author.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Book} from "./entities/book.entity";

@Module({
  imports: [AuthorModule, TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
