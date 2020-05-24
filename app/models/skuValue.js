
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model, Op } = require('sequelize')

class SkuValue extends Model {

  //获取所有的分类
  static async getskuValueList (id) {
    const list = await SkuValue.findAll({
      where: {
        parentSpuId: "spu_1"
      }
    })
    return list
  }

  //获取订单的sku的值
  static async getskuValueNameList (arr) {
    const list = SkuValue.findAll({
      where: {
        id: {
          [Op.or]: arr
        }
      }
    })
    return list
  }
}

SkuValue.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  parentSpuId: Sequelize.STRING,
  name: Sequelize.STRING,
  imgUrl: Sequelize.STRING,
  parentSkyKeyId: Sequelize.STRING,
  preImgUrl: Sequelize.STRING

}, {
  sequelize,
  tableName: 'sku_value'
})

module.exports = { SkuValue }