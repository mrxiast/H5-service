
const Router = require('koa-router')
const { User } = require('../../models/user')
const { RegisterValitor } = require('../../validators/validator')
const success = require('../lib/helper')
const Uuid = require('uuid')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
    const V = await new RegisterValitor().validate(ctx)

    const userInfo = {
        username: V.get('body.username'),
        email: V.get('body.email'),
        password: V.get('body.password'),
        phone: V.get('body.phone'),
        id: Uuid.v1()
    }
    console.log(userInfo, 'userInfouserInfouserInfo')
    const result = await User.create(userInfo)
    success()
})

module.exports = router