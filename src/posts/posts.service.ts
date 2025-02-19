import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { Comment, Post, User } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { SelectPostDto } from './dto/select-post.dto';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class PostsService {
    constructor(private readonly commentsService: CommentsService) {}

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

    // TODO: type annotations
    async findAll() {
        const data = await DrizzleService.db
            .select()
            .from(Post)
            .leftJoin(User, eq(Post.author, User.id))

        const posts = data.map(raw => ({ ...raw.posts, author: raw.users }));

        return posts;
    }

    // TODO: type annotations
    async findOne(id: string) {
        const [post] = await DrizzleService.db
            .select()
            .from(Post)
            .where(eq(Post.id, id))
            .leftJoin(User, eq(Post.author, User.id));

        const comments = await this.commentsService.findAllByPost(id);
        return { ...post.posts, author: post.users,  comments };
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<typeof Post.$inferSelect> {
        const [post] = await DrizzleService.db.update(Post).set(updatePostDto).where(eq(Post.id, id)).returning();
        return post;
    }

    async remove(id: string) {
        await DrizzleService.db.delete(Post).where(eq(Post.id, id));
    }
}
