import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {BookService} from './book.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOkResponse, ApiQuery, ApiTags} from "@nestjs/swagger";
import {User} from "../user/entities/user.entity";

@Controller('book')
@ApiTags('books')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.findAll();
    }

    @Get('search')
    @ApiOkResponse({type: [User]})
    @ApiQuery({name: 'title', required: false})
    @ApiQuery({name: 'ISBN', required: false})
    search(
        @Query('title') title?: string,
        @Query('ISBN') ISBN?: string,
    ) {
        return this.bookService.search({title, ISBN});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.findById(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(+id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookService.remove(+id);
    }
}
