import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { User } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto): Promise<typeof User.$inferInsert | string> {
        try {
            const [user] = await DrizzleService.db.insert(User).values(createUserDto).returning();
            return user;
        } catch (error) {
            const errorMessage = `Error creating new post: ${error.message}`;
            console.log(errorMessage);
            return errorMessage;
        }
    }

    async findAll(): Promise<Array<typeof User.$inferSelect>> {
        const users = await DrizzleService.db.select().from(User);
        return users;
    }

    async findOne(id: string): Promise<typeof User.$inferSelect> {
        const [user] = await DrizzleService.db.select().from(User).where(eq(User.id, id));
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<typeof User.$inferSelect> {
        const [user] = await DrizzleService.db.update(User).set(updateUserDto).where(eq(User.id, id)).returning();
        return user;
    }

    async remove(id: string) {
        await DrizzleService.db.delete(User).where(eq(User.id, id));
    }
}
