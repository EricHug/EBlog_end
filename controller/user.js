let user = require('../model/user')
const config = require('../config/index.js')
let debug = require('debug')('EBlogServer:user')
let {isPhoneNumber, isValidUserpwd} = require('../util/validate')
const jwt = require('jsonwebtoken')
// 登陆
exports.login = async (ctx) => {
    let {
        account,
        password
    } = ctx.request.body
    await user.login(account,password).then(res => {
        debug('登陆成功', res)
        const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.cookies.maxAge }) // token签名 有效期
        ctx.cookies.set('token', token, config.cookies)
        return RETURNSUCCESS(ctx, res)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 注册
exports.register = async (ctx) => {
    let {
        name,
        phone,
        password,
        avatar
    } = ctx.request.body
    const res = await user.findSameAccount({name,phone})
    if(res.length>0){
        return RETURNFAIL(ctx, {
            msg: '姓名或手机号已被注册'
        })
    }
    if(!phone){
        return RETURNFAIL(ctx, {
            msg: '手机号不能为空'
        })
    }
    if (!isPhoneNumber(phone)) {
        return RETURNFAIL(ctx, {
            msg: '手机号必须是11位数字'
        })
    }
    if (!isValidUserpwd(password)) {
        return RETURNFAIL(ctx, {
            msg: '密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
        })
    }
    await user.add([name, phone, password, avatar]).then(res => {
        debug('注册成功', res)
        return RETURNSUCCESS(ctx, res)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}