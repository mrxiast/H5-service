
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class ShopCar extends Model {

  //获取所有的分类
  static async getList (userId) {
    const list = await ShopCar.findAll({
      where: {
        userId: userId
      }
    })
    return list
  }
  //添加购物车
  static async createItem (data) {
    const result = await ShopCar.create(data)
    return result
  }

  //删除购物车内容
  static async del (id, userId) {
    const result = await ShopCar.destroy({
      where: {
        id,
        userId
      }
    })
    return result
  }

}

ShopCar.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  userId: Sequelize.STRING,
  skuId: Sequelize.STRING,
  payNum: Sequelize.INTEGER,
  skuValues: Sequelize.STRING,
  spuId: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'shop_car'
})

module.exports = { ShopCar }