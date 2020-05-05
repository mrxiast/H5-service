const { sequelize } = require('../../core/db')

const { Sequelize, Model ,Op} = require('sequelize')

class WebRouter extends Model {

    static async getParent(){
        const parents = await WebRouter.findAll({
            where:{
                [Op.or]: [{level: 1}, {level: 2}]
            }
        })
        return parents
    }

}

WebRouter.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true,//设置为主键
        // autoIncrement:true,//自增长
    },
    level: Sequelize.INTEGER,
    path: Sequelize.STRING,
    name:Sequelize.STRING,
    component:Sequelize.STRING,
    author_require:Sequelize.BOOLEAN,
    meta_name:Sequelize.STRING,
    redirect:Sequelize.STRING,
}, {
    sequelize,
    tableName: 'webrouter'
})

module.exports = { WebRouter }