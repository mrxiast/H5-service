
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Spu extends Model {

  //获取所有的分类
  static async getItems () {
    const list = await Spu.findAll({})
    return list
  }
  //获取分类页面的商品列表
  static async getGoodsList (id, pageSize, offset) {
    const filtter = {
      offset,
      //limit每页数据数量
      limit: parseInt(pageSize)
    }
    if (id) {
      filtter.where = {
        item_size_id: id
      }
    }
    const result = await Spu.findAndCountAll(filtter)
    return result
  }
  //获取商品详情
  static async getGoodsInfo (id) {
    const info = Spu.findOne({
      where: {
        id: id
      }
    })
    return info
  }
}

Spu.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  name: Sequelize.STRING,
  item_size_id: Sequelize.STRING,
  brand_id: Sequelize.STRING,
  product_url: Sequelize.STRING,
  content: Sequelize.STRING,
  newPrice: Sequelize.DECIMAL,
  price: Sequelize.DECIMAL
}, {
  sequelize,
  tableName: 'spu'
})

module.exports = { Spu }