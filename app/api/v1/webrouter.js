const Router = require('koa-router')
const { WebRouter } = require('../../models/webrouters')
const { Auth } = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/v1/routers'
})

router.get('/', new Auth().m, async (ctx, next) => {
    const parentRouter = await WebRouter.getParent()
    ctx.body = {
        code: 200,
        result: parentRouter,
        msg: '操作成功'
    }
})

module.exports = router