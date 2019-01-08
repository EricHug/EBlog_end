global.BASEDIR = __dirname
global.CONTROLLER = global.BASEDIR + '/controller'
global.MODEL = global.BASEDIR + '/model'

//  global return success
global.RETURNSUCCESS = function (ctx, data, PAGE) {
  ctx.body = {
    'code': 200,
    'data': data,
    'msg': '请求成功',
    pageNum:PAGE?PAGE.pageNum:null,
    pageSize:PAGE?PAGE.pageSize:null,
    pages:PAGE?PAGE.pages:null,
    total:PAGE?PAGE.total:null
  }
}

//  global return fail
global.RETURNFAIL = function (ctx, data, PAGE) {
  ctx.body = {
    'code': 500,
    'data': data,
    'msg': '请求错误',
    pageNum:PAGE?PAGE.pageNum:null,
    pageSize:PAGE?PAGE.pageSize:null,
    pages:PAGE?PAGE.pages:null,
    total:PAGE?PAGE.total:null
  }
  return false
}