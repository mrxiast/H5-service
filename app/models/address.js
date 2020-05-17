
const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class Address extends Model {
  //获取我的所有地址
  static async getMyAddress (userId) {
    const list = await Address.findAll({
      where: {
        userId: userId
      },
      order: [
        ['isDefault']
      ]
    })
    return list
  }

  //修改默认地址
  static async exitDefaultAddress (id, userId) {
    const exitAll = await Address.update(
      { isDefault: '2' },
      {
        where: {
          userId: userId
        }
      }
    )
    const exitById = await Address.update({ isDefault: '1' }, {
      where: {
        userId: userId,
        id: id
      }
    })
    if (exitAll && exitById) {
      return true
    }

  }

  //删除地址
  static async delAddress (id, userId) {
    const result = await Address.destroy({
      where: {
        userId: userId,
        id: id
      }
    })
    if (result) {
      return true
    }
  }

  //修改地址信息
  static async exitAddtess (data, searchData) {
    console.log(data, 'dadada')
    const result = await Address.update(
      data, {
      where: searchData
    })
    if (result) {
      return true
    }
  }

  //添加新地址
  static async addAddress (data) {
    const result = await Address.create(data)
    if (result) {
      return true
    }
  }




}

Address.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,//设置为主键
    // autoIncrement:true,//自增长
  },
  name: Sequelize.STRING(12),
  tel: Sequelize.STRING(20),
  province: Sequelize.STRING,
  city: Sequelize.STRING,
  county: Sequelize.STRING,
  areaCode: Sequelize.STRING,
  addressDetail: Sequelize.STRING,
  isDefault: Sequelize.INTEGER,
  userId: Sequelize.STRING
}, {
  sequelize,
  tableName: 'address'
})

module.exports = { Address }