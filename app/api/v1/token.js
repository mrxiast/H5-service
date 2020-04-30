const Router = require('koa-router')
const { User } = require('../../models/user')
const { TokenValitor, NotEmptyValidtor } = require('../../validators/validator')
const { LoginType } = require('../lib/LoginType')
const { generateToken } = require('../../../core/util')
const Auth = require('../../../middlewares/auth')

const WechatManger = require('../../servise/wechatManger')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/getOpenid', async (ctx, next) => {
    const V = await new TokenValitor().validate(ctx)
    let openid;
    switch (V.get('body.type')) {

        case LoginType.WECHAT_LOGIN:

            openid = await WechatManger.getOpenId(V.get('body.account'))

            break;

        case LoginType.EMAIL_LOGIN:

            openid = await emailLogin(V.get('body.account'), V.get('body.password'))

            break;

        case LoginType.PHONE_LOGIN:

            break;

        default:
            throw new global.errs.ParameterException('暂无错误处理函数')

    }

    async function emailLogin (account, secret) {
        const user = await User.verifyEmailPassword(account, secret)
        return generateToken(user.id, Auth.ADMIN)
    }

    ctx.body = {
        openid
    }

})

router.post('/getToken', async (ctx, next) => {
    console.log(ctx.request.body, '770')
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