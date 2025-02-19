import { AnyPgColumn, pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const Post = pgTable('posts', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    title: text().notNull(),
    author: text().notNull().references((): AnyPgColumn => User.id),
    content: text().notNull()
});

export const User = pgTable('users', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    firstName: text().notNull(),
    lastName: text().notNull(),
});

export const Comment = pgTable('comments', {
    id: text().unique().$defaultFn(createId).primaryKey(),
    content: text().notNull(),
    post: text().notNull().references((): AnyPgColumn => Post.id)
});