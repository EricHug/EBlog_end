let query = require('../database/db.js').query
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     phone VARCHAR(100) NOT NULL COMMENT '手机号',
     password VARCHAR(100) NOT NULL COMMENT '密码',
     avatar VARCHAR(100) COMMENT '头像',
     createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '注册时间',
     update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     PRIMARY KEY ( id )
    );`
let createTable = (sql) => {
    console.log('建表中。。。')
    return query(sql, [])
}
// 建表
createTable(users)

// 增-注册用户
exports.add = (array) => {
    let _sql = "insert into users set name=?,phone=?,password=?,avatar=?;"
    return query(_sql, array)
}
// 删
exports.delete = (id) => {
    let _sql = `delete from users where id="${id}";`
    return query(_sql)
}
// 改
exports.update = (array) => {
    let _sql = `update users set name=?,phone=?,password=?,avatar=? where id=?`
    return query(_sql, array)
}
// 查(id)
exports.findById = (id) => {
    let _sql = `select * from users where id="${id}";`
    return query(_sql)
}
// 查
exports.find = (params) => {
    let _sql = `select * from users `
    let index = 0
    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            let zd = params[i]
            if (zd !== '' && zd != null) {
                _sql += index === 0 ? `where ${i} like "%${zd}%" ` : `and ${i} like "%${zd}%" `
                index++
            }
        }
    }
    return query(_sql)
}
// 查(分页)
exports.findByPage = (
    params,
    pageSize,
    pageNum
) => {
    let _sql = `select * from users `
    let index = 0
    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            let zd = params[i]
            if (zd !== '' && zd != null) {
                _sql += index === 0 ? `where ${i} like "%${zd}%" ` : `and ${i} like "%${zd}%" `
                index++
            }
        }
    }
    _sql += `limit ${pageNum?((pageNum-1)*pageSize):0},${pageSize?pageSize:10};`
    return query(_sql)
}
// 用户登录
exports.login = (account,password) => {
    let _sql = `select * from users where (name = '${account}' or phone = '${account}') and password = '${password}'`
    return query(_sql)
}
// 判断姓名或者手机号是否被注册
exports.findSameAccount = ({name,phone}) => {
    let _sql = `select * from users where name = '${name}' or phone = '${phone}'`
    return query(_sql)
}