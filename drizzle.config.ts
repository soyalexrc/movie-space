import type { Config } from 'drizzle-kit';

export default {
    schema: './core/db/schema.ts',
    out: './core/db/drizzle',
    dialect: 'sqlite',
    driver: 'expo',
} satisfies Config;
