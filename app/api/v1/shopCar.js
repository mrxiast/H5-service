const Router = require('koa-router')
const { ShopCar } = require('../../models/shopCar')
const { AddCartValidtor } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const { SkuValue } = require('../../models/skuValue')
const { Spu } = require('../../models/spu')
const { Sku } = require('../../models/sku')
const Uuid = require('uuid')
const { getUidByToken } = require('../../../core/util')


const router = new Router({
  prefix: '/v1/shopCar'
})

//获取购物车列表
router.get('/', new Auth().m, async (ctx, next) => {
  const userId = getUidByToken(ctx)
  const list = await ShopCar.getList(userId)
  if (list.length > 0) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: await computedData(list),
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: list
    }
  }
})

async function computedData (list) {
  const skuIds = []
  const spuIds = []
  for (let i = 0; i < list.length; ++i) {
    skuIds.push(list[i].skuId)
    spuIds.push(list[i].spuId)
  }
  const skuInfoArr = await Sku.getInfo(skuIds)
  const supInfoArr = await Spu.getList(spuIds)

  const resultList = JSON.parse(JSON.stringify(skuInfoArr))
  for (let i = 0; i < resultList.length; i++) {
    resultList[i].payNum = list[i].payNum
    resultList[i].shopCarId = list[i].id
    resultList[i].skuValues = list[i].skuValues
    for (let j = 0; j < supInfoArr.length; j++) {
      if (resultList[i].parentId == supInfoArr[j].id) {
        resultList[i].name = supInfoArr[j].name
        resultList[i].content = supInfoArr[j].content
        resultList[i].content = supInfoArr[j].content
      }
    }

  }

  return resultList
}

//添加购物车
router.post('/addCart', new Auth().m, async (ctx, next) => {
  const userId = getUidByToken(ctx)
  const V = await new AddCartValidtor().validate(ctx)
  const skuKey = V.get('body.skuKeys')
  const spuId = V.get('body.spuId')
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
  if (result) {
    ctx.body = {
      code: 200,
      result: true,
      msg: '操作成功'
    }
  }


})

//删除购物车物品
router.post('/delItem', new Auth().m, async (ctx, next) => {
  const userId = getUidByToken(ctx)
  const id = ctx.request.body.id
  console.log(userId, id)
  const result = await ShopCar.del(id, userId)
  if (result) {
    ctx.body = {
      code: 200,
      result: true,
      msg: '操作成功'
    }
  }
})



module.exports = router