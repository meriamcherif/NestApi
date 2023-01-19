import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookModule} from './book/book.module';
import {AuthorModule} from './author/author.module';
import {UserModule} from './user/user.module';
import {ShoppingCardModule} from './shopping-card/shopping-card.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            database: 'mariem',
            password:'',
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
        BookModule,
        AuthorModule,
        UserModule,
        ShoppingCardModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
