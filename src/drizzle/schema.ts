import { AnyPgColumn, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const Post = pgTable('posts', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    title: text().notNull(),
    author: text().notNull().references((): AnyPgColumn => User.id),
    content: text().notNull(),
    createdAt: timestamp().notNull().defaultNow()
});

export const User = pgTable('users', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    email: text().notNull(),
    passwordHash: text().notNull(),
    createdAt: timestamp().notNull().defaultNow()
});

export const Comment = pgTable('comments', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    content: text().notNull(),
    user: text().notNull().references((): AnyPgColumn => User.id),
    post: text().notNull().references((): AnyPgColumn => Post.id),
    createdAt: timestamp().notNull().defaultNow()
});