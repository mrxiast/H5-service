const Router = require('koa-router')
const { ShopCar } = require('../../models/shopCar')
const { AddCartValidtor } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { SkuValue } = require('../../models/skuValue')
const { Spu } = require('../../models/spu')
const Uuid = require('uuid')
const { getUidByToken } = require('../../../core/util')


const router = new Router({
  prefix: '/v1/shopCar'
})

//获取购物车列表
router.get('/', new Auth().m, async (ctx, next) => {
  const userId = getUidByToken(ctx)
  const list = await ShopCar.getList(userId)
  if (list) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: list
    }
  }
})

//添加购物车
router.post('/addCart', new Auth().m, async (ctx, next) => {
  const userId = getUidByToken(ctx)
  const V = await new AddCartValidtor().validate(ctx)
  const skuKey = V.get('body.skuKeys')
  const spuId = V.get('body.spuId')
  console.log(spuId, 'supIdsupIdsupId')
  const skuValues = Object.values(skuKey)
  const skuValueName = await SkuValue.getskuValueNameList(skuValues)
  const spuInfo = await Spu.getGoodsInfo(spuId)

  const names = []
  for (let i = 0; i < skuValueName.length; i++) {
    names.push(skuValueName[i].name)
  }
  const data = {
    id: Uuid.v1(),
    payNum: V.get('body.payNum'),
    skuId: V.get('body.skuId'),
    userId: userId,
    skuValues: names.join('-'),
    spuId: spuId
  }
  const result = await ShopCar.createItem(data)
  console.log(result, 'resultttt')
  if (result) {
    ctx.body = {
      code: 200,
      result: true,
      msg: '操作成功'
    }
  }


})



module.exports = router