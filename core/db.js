//sequelize 模块连接musql
const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    //要连接的库的类型
    dialect: 'mysql',
    host,
    port,
    logging: true,//是否在控制台显示mysql原始命令
    timezone: '+08:00',
    define: {
        // raw:true,//true 返回源数据
        timestamps: true,
        paranoid: true,//true 软删除 false 物理删除
        underscored: true,//驼峰命名变为下划线
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        dialectOptions: {
            dateString: true,
            typeCast: true,
            // collate:'utf8_general_ci'
        },
        query: { raw: true }
    }
})
sequelize.sync({
    force: false//重启是否删除mysql数据
})
module.exports = {
    sequelize
}