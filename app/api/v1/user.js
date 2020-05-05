
const Router = require('koa-router')
const { User } = require('../../models/user')
const { RegisterValitor,ValidationPhone,ResetpasswordValitor } = require('../../validators/validator')
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
router.get('/getCode',async (ctx,next)=>{
    const v = await new ValidationPhone().validate(ctx)
    const phone = v.get('body.phone')
    ctx.body = {
        code:200,
        msg:'操作成功',
        phoneCode : 1992
    }
})
router.post('/reset',async(ctx,next)=>{
    const v =await new ResetpasswordValitor().validate(ctx)
    const username = v.get('body.username')

    const password = v.get('body.newpassword1')
    const user = await User.verifyResetPassword(username,password)
    if(user){
        ctx.body={
            code:200,
            msg:'修改成功',
            result:true
        }
    }


})

module.exports = router