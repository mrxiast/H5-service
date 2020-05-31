
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

const { OrderItem } = require('../models/order_item')

class Orders extends Model {

  //获取所有的分类
  static async getList (id) {
    const list = await Orders.findAll({
      where: {
        parentId: id
      }
    })
    return list
  }
  //创建订单
  static async cerateOrder (data) {
    return sequelize.transaction(async t => {
      let orderId = Uuid.v1()
      const result = await Orders.create({
        id: orderId,
        userId: data.userId,
        orderId: data.orderId,
        status: data.status,
        allPrice: data.allPrice,
        addressId: data.addressId,
        transaction: t
      })
      for (let i = 0; i < data.orderInfo.length; ++i) {
        const orderItemResult = await OrderItem.create({
          id: Uuid.v1(),
          imgUrl: data.orderInfo[i].imgUrl,
          name: data.orderInfo[i].name,
          payNum: data.orderInfo[i].payNum,
          price: data.orderInfo[i].price,
          skuId: data.orderInfo[i].skuId,
          spuId: data.orderInfo[i].spuId,
          skuKey: JSON.stringify(data.orderInfo[i].skuKeys),
          orderId: data.orderId,
          transaction: t
        })
      }
    })
  }

  //查询订单
  static async getList (userId, status) {
    console.log(userId, status)
    const list = await Orders.findAll({
      where: {
        userId,
        status
      },
      attributes: {
        exclude: ['created_at', 'deleted_at', 'updated_at', 'userId']
      }
    })
    console.log(list.length)
    if (list.length > 0) {
      for (let i = 0; i < list.length; ++i) {
        const itemList = await OrderItem.findAll({
          orderId: list[i].orderId,
          userId: userId
        })
        console.log('12465')
        list[i].setDataValue('orderInfo', itemList)
      }
    }
    return list
  }

}

Orders.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  userId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  status: Sequelize.INTEGER,
  allPrice: Sequelize.STRING,
  addressId: Sequelize.STRING

}, {
  sequelize,
  tableName: 'orders'
})

module.exports = { Orders }