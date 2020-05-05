const Router = require('koa-router')
const { User } = require('../../models/user')
const { TokenValitor, NotEmptyValidtor } = require('../../validators/validator')
const { LoginType } = require('../lib/LoginType')
const { generateToken } = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const {WebRouter} = require('../../models/webrouters')

const WechatManger = require('../../servise/wechatManger')

const router = new Router({
    prefix: '/v1/login'
})

router.post('/', async (ctx, next) => {
        const a = await new WebRouter()
    const V = await new TokenValitor().validate(ctx)
    let token;
    console.log(V.get('body.type'))
    switch (V.get('body.type')) {

        case LoginType.WECHAT_LOGIN:

            token = await WechatManger.getOpenId(V.get('body.account'))

            break;

        case LoginType.ACC_LOGIN:

            token = await accLogin(V.get('body.username'), V.get('body.password'))

            break;

        case LoginType.PHONE_LOGIN:

            break;

        default:
            throw new global.errs.ParameterException('暂无错误处理函数')

    }

    async function accLogin (username, password) {
        const user = await User.verifyEmailPassword(username, password)
        return generateToken(user.id, Auth.ADMIN)
    }

    ctx.body = {
        code:200,
        token
    }

})

router.post('/getToken', async (ctx, next) => {
    const openId = ctx.request.body.openid
    const token = generateToken(openId, Auth.WECHAT)

    ctx.body = {
        token
    }
})

router.post('/verify', async (ctx, next) => {
    const v = new Auth.NotEmptyValidtor().validate(ctx)
    const result = Auth.verifyToken(token)
    ctx.body = { result }
})

module.exports = router