
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class OrderItem extends Model {

  //获取所有的分类
  static async geOrderId (id) {
    const list = await OrderItem.findAll({
      where: {
        orderId: id
      }
    })
    return list
  }
  //创建订单单个商品信息
  static async cerateOrder (data) {
    const result = await OrderItem.create({
      id: Uuid.v1(),
      orderId: data.orderId,
      imgUrl: data.imgUrl,
      name: data.name,
      payNum: data.payNum,
      price: data.price,
      skuId: data.skuId,
      spuId: data.spuId
    })
    if (result) {
      return true
    }
  }
}

OrderItem.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  orderId: Sequelize.STRING,
  imgUrl: Sequelize.STRING,
  name: Sequelize.STRING,
  payNum: Sequelize.INTEGER,
  price: Sequelize.DECIMAL,
  skuId: Sequelize.STRING,
  spuId: Sequelize.STRING,
  skuKey: Sequelize.STRING
}, {
  sequelize,
  tableName: 'order_item'
})

module.exports = { OrderItem }