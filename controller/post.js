let post = require('../model/post')
let debug = require('debug')('EBlogServer:post')
// 增
exports.add = async (ctx) => {
    let {
        title,
        content,
        name,
        uid,
        type
    } = ctx.request.body
    await post.add({title, content, name, uid, type}).then(res => {
        debug('添加成功', res)
        return RETURNSUCCESS(ctx, res)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 删
exports.delete = async (ctx) => {
    let {
        id
    } = ctx.request.body
    await post.delete(id).then(res => {
        debug('删除成功', res)
        return RETURNSUCCESS(ctx, res)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 改
exports.update = async (ctx) => {
    let {
        title,
        content,
        type,
        id
    } = ctx.request.body
    await post.update([title, content, type, id]).then(res => {
        debug('更新成功', res)
        return RETURNSUCCESS(ctx, res)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 查(id)
exports.findById = async (ctx) => {
    let {
        id
    } = ctx.request.body
    await post.findById(id).then(res => {
        debug('查找成功', res)
        return RETURNSUCCESS(ctx, res[0])
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 查
exports.find = async (ctx) => {
    let {
        type
    } = ctx.request.body
    await post.findByPage({
        type
    }).then(res => {
        debug('查找成功', res)
        return RETURNSUCCESS(ctx, res, {
            pageNum,
            pageSize,
            pages
        })
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 查（分页）
exports.findByPage = async (ctx) => {
    let {
        pageNum,
        pageSize,
        ...params
    } = ctx.request.body
    let total
    // 获取总条数
    await post.find(params).then(res => {
        debug('查找成功', res)
        total = res ? res.length : 0
        debug(total)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
    debug('pageSize,pageNum', pageSize, pageNum)
    // 分页查找
    await post.findByPage(params, pageSize, pageNum).then(res => {
        debug('查找成功', res)
        let pageNum1 = pageNum ? pageNum : 1,
            pageSize1 = pageSize ? pageSize : 10
        return RETURNSUCCESS(ctx, res, {
            pageNum: pageNum1,
            pageSize: pageSize1,
            pages: Math.ceil(total / pageSize1),
            total
        })
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}
// 查前后(id)
exports.findAroundById = async (ctx) => {
    let {
        id,
        type
    } = ctx.request.body
    //通过id找前后数据
    await post.findAroundById(id, type).then(res => {
        debug('查找成功', res)
        let result = {}
        if (res.length == 1) {
            result['cur'] = res[0]
        } else if (res.length == 2) {
            if (res[0]['id'] == id) {
                result['cur'] = res[0]
                result['next'] = res[1]
            }
            if (res[1]['id'] == id) {
                result['cur'] = res[1]
                result['prev'] = res[0]
            }
        } else {
            result['prev'] = res[0]
            result['cur'] = res[1]
            result['next'] = res[2]
        }
        return RETURNSUCCESS(ctx, result)
    }).catch(err => {
        return RETURNFAIL(ctx, err)
    })
}