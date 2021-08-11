import { AbstractSqlConnection, Knex } from '@mikro-orm/knex';
export declare class MySqlConnection extends AbstractSqlConnection {
    connect(): Promise<void>;
    getDefaultClientUrl(): string;
    getConnectionOptions(): Knex.MySqlConnectionConfig;
    protected transformRawResult<T>(res: any, method: 'all' | 'get' | 'run'): T;
}
