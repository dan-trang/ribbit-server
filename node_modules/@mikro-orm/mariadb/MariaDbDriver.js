"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MariaDbDriver = void 0;
const mysql_base_1 = require("@mikro-orm/mysql-base");
const MariaDbConnection_1 = require("./MariaDbConnection");
class MariaDbDriver extends mysql_base_1.AbstractSqlDriver {
    constructor(config) {
        super(config, new mysql_base_1.MySqlPlatform(), MariaDbConnection_1.MariaDbConnection, ['knex', 'mariadb']);
    }
    async nativeInsertMany(entityName, data, ctx, processCollections = true) {
        const res = await super.nativeInsertMany(entityName, data, ctx, processCollections);
        const pks = this.getPrimaryKeyFields(entityName);
        data.forEach((item, idx) => { var _a; return res.rows[idx] = { [pks[0]]: (_a = item[pks[0]]) !== null && _a !== void 0 ? _a : res.insertId + idx }; });
        res.row = res.rows[0];
        return res;
    }
}
exports.MariaDbDriver = MariaDbDriver;
