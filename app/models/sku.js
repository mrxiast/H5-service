
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Sku extends Model {

  //获取所有的分类
  static async getList (id) {
    const list = await Sku.findAll({
      where: {
        parentId: id
      }
    })
    return list
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
  preImgUrl: Sequelize.STRING

}, {
  sequelize,
  tableName: 'sku'
})

module.exports = { Sku }