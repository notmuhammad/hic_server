import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [BlogsModule],
  controllers: [AppController, BlogsController],
  providers: [AppService],
})
export class AppModule {}
