const mysql = require('mysql')
const config = require('../config/index.js')
let debug = require('debug')('EBlogServer:initdb')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT,
    multipleStatements: config.database.MULTIPLE_STATEMENTS,
    dateStrings: config.database.DATE_STRINGS
});

exports.query = (sql, values) => {
    console.log(sql,values)
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                debug("建立连接失败");
                reject(err)
            } else {
                debug("建立连接成功");
                debug(`pool._allConnections.length`,pool._allConnections.length);
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                    debug(`pool._allConnections.length`,pool._allConnections.length);
                })
            }
        })
    })
}