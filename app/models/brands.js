
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Brands extends Model {

  //获取商品详情spu的ID获取品牌名称
  static async getGoodsBrands (item_size_id) {
    const info = Brands.findOne({
      where: {
        item_size_id: item_size_id
      }
    })
    return info
  }
}

Brands.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  name: Sequelize.STRING,
  item_size_id: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'brands'
})

module.exports = { Brands }