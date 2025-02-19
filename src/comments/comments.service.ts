import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from 'src/drizzle/schema';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class CommentsService {
    async create(createCommentDto: CreateCommentDto): Promise<typeof Comment.$inferInsert | string> {
        try {
            const [comment] = await DrizzleService.db.insert(Comment).values(createCommentDto).returning();
            return comment;
        } catch (error) {
            const errorMessage = `Error creating new post: ${error.message}`;
            console.log(errorMessage);
            return errorMessage;
        }
    }

    async findAll(): Promise<Array<typeof Comment.$inferSelect>> {
        const comments = await DrizzleService.db.select().from(Comment);
        return comments;
    }

    async findAllByPost(postId: string): Promise<Array<typeof Comment.$inferSelect>> {
        const comments = await DrizzleService.db.select().from(Comment).where(eq(Comment.post, postId));
        return comments;
    }

    async findOne(id: string): Promise<typeof Comment.$inferSelect> {
        const [comment] = await DrizzleService.db.select().from(Comment).where(eq(Comment.id, id));
        return comment;
    }

    async update(id: string, updateCommentDto: UpdateCommentDto): Promise<typeof Comment.$inferSelect> {
        const [comment] = await DrizzleService.db.update(Comment).set(updateCommentDto).where(eq(Comment.id, id)).returning();
        return comment;
    }

    async remove(id: string) {
        await DrizzleService.db.delete(Comment).where(eq(Comment.id, id));
    }
}
