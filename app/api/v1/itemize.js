const Router = require('koa-router')
const { Itemize } = require('../../models/itemize')
const { Imgs } = require('../../models/imgs')
const { Spu } = require('../../models/spu')
const { Sku } = require('../../models/sku')
const { Brands } = require('../../models/brands')
const { SkuKey } = require('../../models/skyKey')
const { SkuValue } = require('../../models/skuValue')


const router = new Router({
  prefix: '/v1/itemize'
})
//获取所有商品分类
router.get('/items', async (ctx, next) => {
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
  let info = await Spu.getGoodsInfo(id)
  const imgList = await Imgs.getImgListById(id)
  const brandsInfo = await Brands.getGoodsBrands(info.item_size_id)
  const skuList = await Sku.getList(id)
  const skuKeyList = await SkuKey.getSkuKeyList(info.item_size_id)
  const skuValueList = await SkuValue.getskuValueList(id)

  const tree = []
  for (let i = 0; i < skuKeyList.length; i++) {
    tree.push({
      k: skuKeyList[i].name,
      k_s: skuKeyList[i].id,
      v: []
    })
    for (let j = 0; j < skuValueList.length; j++) {
      if (skuValueList[j].parentSkyKeyId === tree[i].k_s) {
        tree[i].v.push({
          id: skuValueList[j].id, // skuValueId：规格值 id
          name: skuValueList[j].name, // skuValueName：规格值名称
          imgUrl: skuValueList[j].imgUrl, // 规格类目图片，只有第一个规格类目可以定义图片
          previewImgUrl: skuValueList[j].preImgUrl,
          parentSkyKeyId: skuValueList[j].parentSkyKeyId
        })
      }
    }

  }
  const list = []
  let treeLength = tree.length
  let s1 = tree[0].k_s
  let s2 = tree[1].k_s
  let s3 = tree[2].k_s
  for (let i = 0; i < skuList.length; ++i) {
    switch (treeLength) {
      case 1:
        list.push({
          id: skuList[i].id,
          price: skuList[i].price * 100,
          [s1]: skuList[i].skuValueNcId,//规格类目 k_s 为 s1 的对应规格值 id
          stock_num: skuList[i].stock
        })
        break;
      case 2:
        list.push({
          id: skuList[i].id,
          price: skuList[i].price * 100,
          [s1]: skuList[i].skuValueNcId,//规格类目 k_s 为 s1 的对应规格值 id
          [s2]: skuList[i].skuValueYcId,//规格类目 k_s 为 s1 的对应规格值 id
          stock_num: skuList[i].stock
        })
        break;
      case 3:
        list.push({
          id: skuList[i].id,
          price: skuList[i].price * 100,
          [s1]: skuList[i].skuValueNcId,//规格类目 k_s 为 s1 的对应规格值 id
          [s2]: skuList[i].skuValueYcId,//规格类目 k_s 为 s1 的对应规格值 id
          [s3]: skuList[i].skuValueColorId,//规格类目 k_s 为 s1 的对应规格值 id
          stock_num: skuList[i].stock
        })
        break;
    }

  }



  let min = Number(skuList[0].price)
  let max = skuList[0].price
  let amountStock = 0

  for (let i = 0; i < skuList.length; ++i) {
    if (Number(skuList[i].price) < min) {
      min = skuList[i].price
    }
    if (Number(skuList[i].price) > max) {
      max = skuList[i].price
    }
    amountStock += skuList[i].stock
  }
  let priceSection = min + "~" + max
  info.setDataValue('amountStock', amountStock)
  // info.setDataValue('skuList', skuList)
  // info.setDataValue('skuKeyList', skuKeyList)

  info.setDataValue('priceSection', priceSection)
  info.setDataValue('imgList', imgList)
  info.setDataValue('brandsInfo', brandsInfo)
  info.setDataValue('tree', tree)
  info.setDataValue('list', list)
  ctx.body = {
    code: 200,
    msg: '操作成功',
    result: info
  }
})

module.exports = router