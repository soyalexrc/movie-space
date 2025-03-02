import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const movies = sqliteTable('movies', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    movie_id: integer('movie_id').unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    releaseDate: text('releaseDate').notNull(),
    poster: text('poster').notNull(),
    backdrop: text('backdrop').notNull(),
    rating: integer('rating').notNull(),
    budget: integer('budget').notNull(),
    duration: integer('duration').notNull(),
    genres: text('genres').notNull(),
    originalTitle: text('originalTitle').notNull(),
    productionCompanies: text('productionCompanies').notNull(),
    list_id: integer('list_id')
        .notNull()
        .references(() => lists.id),
});

export const lists = sqliteTable('lists', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
});

// Export Task to use as an interface in your app
export type Movie = typeof movies.$inferSelect;
export type List = typeof lists.$inferSelect;
