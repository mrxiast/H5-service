const Router = require('koa-router')
const { Address } = require('../../models/address')
const { DelAddressValidtor, AddOrChangeValidtor, AddAddressValidtor } = require('../../validators/validator')
const { getUidByToken } = require('../../../core/util')
const Uuid = require('uuid')
const router = new Router({
  prefix: '/v1/address'
})
//获取我的地址
router.post('/myAddress', async (ctx, next) => {
  const userId = ctx.request.body.userId
  const list = await Address.getMyAddress(userId)

  ctx.body = {
    code: 200,
    result: list,
    msg: '操作成功'
  }
})
//设置默认地址
router.post('/setDefaultAddress', async (ctx, next) => {
  const id = ctx.request.body.id
  const userId = ctx.request.body.userId
  const isOk = await Address.exitDefaultAddress(id, userId)
  if (isOk) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: true
    }
  }
})
//修改地址信息
router.post('/setAddress', async (ctx, next) => {
  const V = await new AddOrChangeValidtor().validate(ctx)
  let data = {
    addressDetail: V.get('body.addressDetail'),
    areaCode: V.get('body.areaCode'),
    county: V.get('body.county'),
    isDefault: V.get('body.isDefault'),
    name: V.get('body.name'),
    province: V.get('body.province'),
    tel: V.get('body.tel'),
  }
  const searchData = {
    userId: V.get('body.userId'),
    id: V.get('body.id')
  }
  const result = await Address.exitAddtess(data, searchData)
  if (result) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: true
    }
  }

})
//删除地址
router.post('/delAddress', async (ctx, next) => {
  const V = await new DelAddressValidtor().validate(ctx)
  const userId = V.get('body.userId')
  const id = V.get('body.id')
  const result = await Address.delAddress(id, userId)
  if (result) {
    ctx.body = {
      code: 200,
      result: true,
      msg: '操作成功'
    }
  }
})
//添加新地址
router.post('/addAddress', async (ctx, next) => {
  const V = await new AddAddressValidtor().validate(ctx)
  const userId = getUidByToken(ctx)
  let data = {
    addressDetail: V.get('body.addressDetail'),
    areaCode: V.get('body.areaCode'),
    county: V.get('body.county'),
    isDefault: V.get('body.isDefault'),
    name: V.get('body.name'),
    province: V.get('body.province'),
    tel: V.get('body.tel'),
    id: Uuid.v1(),
    userId: userId
  }

  const result = await Address.addAddress(data)
  if (result) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: true
    }
  }
})


module.exports = router