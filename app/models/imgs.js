
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Imgs extends Model {

  static async getImgListByType (type) {

    const list = await Imgs.findAll({
      where: {
        type: type
      }
    })
    return list
  }




}

Imgs.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  url: Sequelize.STRING,
  type: Sequelize.INTEGER,
  goods_id: Sequelize.STRING,
}, {
  sequelize,
  tableName: 'imgs'
})

module.exports = { Imgs }