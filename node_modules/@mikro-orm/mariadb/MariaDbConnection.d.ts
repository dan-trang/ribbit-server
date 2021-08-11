import { MySqlConnection, Knex } from '@mikro-orm/mysql-base';
export declare class MariaDbConnection extends MySqlConnection {
    connect(): Promise<void>;
    getConnectionOptions(): Knex.MySqlConnectionConfig;
    private getPatchedDialect;
}
