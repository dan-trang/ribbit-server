"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MariaDbConnection = void 0;
const mysql_base_1 = require("@mikro-orm/mysql-base");
class MariaDbConnection extends mysql_base_1.MySqlConnection {
    async connect() {
        this.client = this.createKnexClient(this.getPatchedDialect());
    }
    getConnectionOptions() {
        const ret = super.getConnectionOptions();
        ret.bigNumberStrings = true;
        return ret;
    }
    getPatchedDialect() {
        const { MySqlDialect } = mysql_base_1.MonkeyPatchable;
        MySqlDialect.prototype.driverName = 'mariadb';
        MySqlDialect.prototype._driver = () => require('mariadb/callback');
        MySqlDialect.prototype.validateConnection = (connection) => connection.isValid();
        return MySqlDialect;
    }
}
exports.MariaDbConnection = MariaDbConnection;
