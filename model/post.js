let query = require('../database/db.js').query
let debug = require('debug')('EBlogServer:post')
let posts =
    `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20) COMMENT '评论题目',
    content VARCHAR(2000) COMMENT '评论内容',
    name CHAR(20) DEFAULT '' COMMENT '文章作者',
    uid INT DEFAULT 1 COMMENT '用户id',
    type CHAR(10) DEFAULT '0' COMMENT '文章类型',
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT '发表时间',
    updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
    );`
let createTable = (sql) => {
    console.log('建表中。。。')
    return query(sql, [])
}
// 建表
createTable(posts)

// 增
exports.add = (params) => {
    console.log(params)
    let _sql = `insert into posts `
    let _p1 = '(',
        _p2 = '('
    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            let zd = params[i]
            if (zd !== '' && zd != null) {
                console.log('i', i)
                console.log('zd', zd)
                _p1 += `${i},`
                _p2 += `"${zd}",`
            }
        }
    }
    _p1 = _p1.slice(0, _p1.length - 1) + ')'
    _p2 = _p2.slice(0, _p2.length - 1) + ')'
    _sql = _sql + _p1 + ' values ' + _p2
    console.log(_sql)
    return query(_sql)
}
// 删
exports.delete = (id) => {
    let _sql = `delete from posts where id="${id}";`
    return query(_sql)
}
// 改
exports.update = (array) => {
    let _sql = `update posts set title=?,content=?,type=? where id=?`
    return query(_sql, array)
}
// 查(id)
exports.findById = (id) => {
    let _sql = `select * from posts where id="${id}";`
    return query(_sql)
}
// 查
exports.find = (params) => {
    let _sql = `select * from posts `
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
    let _sql = `select * from posts `
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
    _sql += `order by createtime desc limit ${pageNum?((pageNum-1)*pageSize):0},${pageSize?pageSize:10};`
    return query(_sql)
}
// 查前后数据(id)
exports.findAroundById = (id, type) => {
    let frag_sql = (type == '' || type == null) ? `` : `and type = ${type}`
    debug('frag_sql', frag_sql)
    let _sql = `(select * from posts where id <${id} ` + frag_sql + ` order by createtime desc limit 1) union (select * from posts where id =${id} ` + frag_sql + ` ) union (select * from posts where id >${id} ` + frag_sql + ` order by createtime asc limit 1);`
    return query(_sql)
}