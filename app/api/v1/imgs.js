const Router = require('koa-router')
const { Imgs } = require('../../models/imgs')
const { ValidationTypeInteger } = require('../../validators/validator')
const router = new Router({
  prefix: '/v1/img'
})

router.get('/ImgByType', async (ctx, next) => {
  const V = await new ValidationTypeInteger().validate(ctx)
  const type = V.get('query.type')

  const list = await Imgs.getImgListByType(type)
  ctx.body = {
    code: 200,
    result: list,
    msg: '操作成功'
  }
})

module.exports = router