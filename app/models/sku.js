
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model, Op } = require('sequelize')

class Sku extends Model {

  //获取产品所有的sku
  static async getList (id) {
    const list = await Sku.findAll({
      where: {
        parentId: id
      }
    })
    return list
  }

  //购物车根据id获取产品
  static async getInfo (ids) {
    const infoArr = await Sku.findAll({
      where: {
        id: {
          [Op.or]: ids
        }
      }
    })
    return infoArr
  }
}


Sku.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  skuValueColorId: Sequelize.STRING,
  skuValueNcId: Sequelize.STRING,
  skuValueYcId: Sequelize.STRING,
  stock: Sequelize.INTEGER,
  price: Sequelize.DECIMAL,
  parentId: Sequelize.STRING,
  imgUrl: Sequelize.STRING,
  preImgUrl: Sequelize.STRING,
  tagType: Sequelize.INTEGER

}, {
  sequelize,
  tableName: 'sku'
})

module.exports = { Sku }