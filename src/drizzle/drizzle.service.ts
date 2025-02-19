import { Injectable } from '@nestjs/common';
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class DrizzleService {
    static db: NodePgDatabase;

    constructor() {
        DrizzleService.db = drizzle({
            connection: {
                connectionString: process.env.DATABASE_URL!
            },
            casing: "snake_case"
        });
    }
}

