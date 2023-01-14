import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BookModule} from './book/book.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'ktebi',
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
    }), BookModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
