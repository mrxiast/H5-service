
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Imgs extends Model {
  //根据类型筛选图片 1为首页banner图片
  static async getImgListByType (type) {

    const list = await Imgs.findAll({
      where: {
        type: type
      }
    })
    return list
  }

  //根据id 获取商品详情图片
  static async getImgListById (id) {

    const list = await Imgs.findAll({
      where: {
        goods_id: id
      },
      attributes: ['url']
    })
    let endList = []
    list.forEach(item => {
      endList.push(item.url)
    })
    return endList
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