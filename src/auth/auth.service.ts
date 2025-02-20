import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { User } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async hashPassword(password: string) {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(password, salt);

        return hashed;
    }

    async compare(password: string, hashed: string) {
        const result = await bcrypt.compare(password, hashed);

        return result;
    }

    async validateUser(email: string, password: string) {
        const [user] = await DrizzleService.db.select().from(User).where(eq(User.email, email));

        if (!user)
            return null;

        if (await this.compare(password, user.passwordHash)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: typeof User.$inferSelect) {
        console.log(user)
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        const hashedPassword = await this.hashPassword(createUserDto.password);

        try {
            const [user] = await DrizzleService.db
                .insert(User)
                .values({
                    ...createUserDto,
                    passwordHash: hashedPassword
                })
                .returning();


            return user;
        } catch (error) {
            const errorMessage = `Error creating new post: ${error.message}`;
            console.log(errorMessage);
            return errorMessage;
        }
    }
}
