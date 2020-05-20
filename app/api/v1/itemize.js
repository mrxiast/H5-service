const Router = require('koa-router')
const { Itemize } = require('../../models/itemize')
const { Imgs } = require('../../models/imgs')
const { Spu } = require('../../models/spu')

const router = new Router({
  prefix: '/v1/itemize'
})
//获取所有商品分类
router.get('/items', async (ctx, next) => {
  //   const V = await new ValidationTypeInteger().validate(ctx)
  //   const type = V.get('query.type')

  //   const list = await Imgs.getImgListByType(type)
  //   ctx.body = {
  //     code: 200,
  //     result: list,
  //     msg: '操作成功'
  //   }
  // console.log(';123465')
  const list = await Itemize.getItems()
  if (list) {
    ctx.body = {
      code: 200,
      msg: '操作成功',
      result: list
    }
  }
})

//获取分类后的商品列表
router.get('/goodsList', async (ctx, next) => {
  const id = ctx.request.query.id
  const pageSize = ctx.request.query.pageSize || 10
  const pageNum = ctx.request.query.pageNum || 1
  let offset = (pageNum - 1) * pageSize;
  const result = await Spu.getGoodsList(id, pageSize, offset)
  if (result) {
    ctx.body = {
      code: 200,
      result: {
        total: result.count,
        list: result.rows
      },
      msg: '操作成功'
    }
  }
})

//获取货物的详情
router.get('/getGoodsInfo', async (ctx, next) => {
  const id = ctx.request.query.id
  const info = await Spu.getGoodsInfo(id)
  const imgList = await Imgs.getImgListById(id)

  console.log(imgList, 'info')
  ctx.body = {
    code: 200,
    msg: '操作成功',
    result: {
      info: info,
      imgList: imgList
    }
  }
})

module.exports = router