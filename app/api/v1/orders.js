const Router = require('koa-router')
const { Orders } = require('../../models/orders')
const { AddOrderValidtor } = require('../../validators/validator')
const { getUidByToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { OrderItem } = require('../../models/order_item')
const success = require('../lib/helper')

const Uuid = require('uuid')
const router = new Router({
  prefix: '/v1/orders'
})

//提交订单
router.post('/postOrder', new Auth().m, async (ctx, next) => {
  const V = await new AddOrderValidtor().validate(ctx)
  const userId = getUidByToken(ctx)
  const data = {
    userId: userId,
    addressId: V.get('body.addressId'),
    orderInfo: V.get('body.orderInfo'),
    status: 1,
    orderId: Date.now() + '',
    allPrice: V.get('body.allPrice')
  }
  await Orders.cerateOrder(data)
  success()
})


//查询订单
router.get('/getOrderList', new Auth().m, async (ctx, next) => {
  const status = ctx.request.query.status || 1
  const userId = getUidByToken(ctx)
  const orderList = await Orders.getList(userId, status)
  ctx.body = {
    code: 200,
    msg: '操作成功',
    result: orderList
  }
})


module.exports = router