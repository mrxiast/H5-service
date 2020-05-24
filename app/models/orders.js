
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

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
}

Orders.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  userId: Sequelize.STRING,
  skuId: Sequelize.STRING

}, {
  sequelize,
  tableName: 'orders'
})

module.exports = { Orders }