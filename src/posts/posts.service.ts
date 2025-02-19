import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Post } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
    async create(createPostDto: CreatePostDto): Promise<typeof Post.$inferInsert | string> {
        try {
            const [post] = await DrizzleService.db.insert(Post).values(createPostDto).returning();
            return post;
        } catch (error) {
            const errorMessage = `Error creating new post: ${error.message}`;
            console.log(errorMessage);
            return errorMessage;
        }
    }

    async findAll(): Promise<Array<typeof Post.$inferSelect>> {
        const posts = await DrizzleService.db.select().from(Post);
        return posts;
    }

    async findOne(id: string): Promise<typeof Post.$inferSelect> {
        const [post] = await DrizzleService.db.select().from(Post).where(eq(Post.id, id));
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<typeof Post.$inferSelect> {
        const [post] = await DrizzleService.db.update(Post).set(updatePostDto).where(eq(Post.id, id)).returning();
        return post;
    }

    async remove(id: string) {
        await DrizzleService.db.delete(Post).where(eq(Post.id, id));
    }
}
