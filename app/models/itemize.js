
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Itemize extends Model {

  //获取所有的分类
  static async getItems () {
    const list = await Itemize.findAll({})
    return list
  }
}

Itemize.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  name: Sequelize.STRING(12),
  icon: Sequelize.STRING
}, {
  sequelize,
  tableName: 'itemize'
})

module.exports = { Itemize }