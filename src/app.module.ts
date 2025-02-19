import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DrizzleService } from './drizzle/drizzle.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PostsModule,
        UsersModule,
        CommentsModule,
    ],
    controllers: [AppController],
    providers: [AppService, DrizzleService],
})
export class AppModule {}
