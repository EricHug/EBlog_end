const router = require('koa-router')()
const controller = require('../controller/index')

// 登录注册
router.get('/user/login',controller.user.login)
router.post('/user/register',controller.user.register)

// 文章
router.post('/post/add',controller.post.add)
router.post('/post/delete',controller.post.delete)
router.post('/post/update',controller.post.update)
router.post('/post/findAroundById',controller.post.findAroundById)
router.post('/post/findById',controller.post.findById)
router.post('/post/findByPage',controller.post.findByPage)

module.exports = router