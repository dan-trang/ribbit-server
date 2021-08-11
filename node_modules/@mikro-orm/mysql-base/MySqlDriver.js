"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDriver = void 0;
const knex_1 = require("@mikro-orm/knex");
const MySqlConnection_1 = require("./MySqlConnection");
const MySqlPlatform_1 = require("./MySqlPlatform");
class MySqlDriver extends knex_1.AbstractSqlDriver {
    constructor(config) {
        super(config, new MySqlPlatform_1.MySqlPlatform(), MySqlConnection_1.MySqlConnection, ['knex', 'mysql2']);
    }
    async nativeInsertMany(entityName, data, ctx, processCollections = true) {
        const res = await super.nativeInsertMany(entityName, data, ctx, processCollections);
        const pks = this.getPrimaryKeyFields(entityName);
        data.forEach((item, idx) => { var _a; return res.rows[idx] = { [pks[0]]: (_a = item[pks[0]]) !== null && _a !== void 0 ? _a : res.insertId + idx }; });
        res.row = res.rows[0];
        return res;
    }
}
exports.MySqlDriver = MySqlDriver;
