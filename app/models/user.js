const bcrypt = require('bcrypt')//密码加密

const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {

    //类的一个方法，下发token时用
    static async verifyEmailPassword (email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.NotFound('未找到该用户')
        }

        const correct = bcrypt.compareSync(plainPassword, user.password)//固定写法，可以将加密过的密码还原与用户输入密码对比

        if (!correct) {
            throw new global.errs.AuthorFail('密码错误')
        }

        return user
    }


    //小程序用的

    static async getUserInfo (openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    static async createUserInfo (openid) {
        const user = await User.create({
            openid,
            id: Uuid.v1()
        })

        return user
    }

}

User.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true,//设置为主键
        // autoIncrement:true,//自增长
    },
    username: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        set (val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    phone: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = { User }