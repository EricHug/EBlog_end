// let comment = require('../model/comment')
let user = require('../model/user')
exports.query = async (ctx) =>{
    // insert into users set name=?,pass=?,avatar=?,moment=?
    let {name,pass,avatar,moment} = ctx.request.body
    await user.insertData([name,pass,avatar,moment]).then(res=>{
        ctx.body={
            code: 200,
            message: '注册成功'
        }
    })
}