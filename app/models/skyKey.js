
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class SkuKey extends Model {

  //获取所有的分类
  static async getSkuKeyList (id) {
    const list = await SkuKey.findAll({
      where: {
        itemizeId: id
      }
    })
    return list
  }
}

SkuKey.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  itemizeId: Sequelize.STRING,
  name: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'sku_key'
})

module.exports = { SkuKey }