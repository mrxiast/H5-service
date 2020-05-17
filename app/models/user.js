const bcrypt = require('bcrypt')//密码加密

const CryptoJS = require('crypto-js')

const Uuid = require('uuid')

const { sequelize } = require('../../core/db')

const { Sequelize, Model } = require('sequelize')

class User extends Model {


    //类的一个方法，账号密码登录确定用户
    static async verifyEmailPassword (username, plainPassword) {
        const user = await User.findOne({
            where: {
                username
            }
        })
        if (!user) {
            throw new global.errs.AuthorFail('此账号未注册')
        }
        const key = '0880076B18D7EE81';  //密钥
        const iv = 'CB3EC842D7C69578';  //十六位十六进制数作为密钥偏移量
        //解密
        const endkey = CryptoJS.enc.Utf8.parse(key);
        const endiv = CryptoJS.enc.Utf8.parse(iv);
        const decrypted = CryptoJS.AES.decrypt(plainPassword, endkey,
            {
                iv: endiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        const password = decrypted.toString(CryptoJS.enc.Utf8);

        console.log(password, 'password')

        const correct = bcrypt.compareSync(password, user.password)//固定写法，可以将加密过的密码还原与用户输入密码对比

        if (!correct) {
            throw new global.errs.AuthorFail('密码错误')
        }

        return user
    }

    //类的一个方法，寻找用户修改密码
    static async verifyResetPassword (username, password) {
        const user1 = await User.findOne({
            where: {
                username
            }
        })
        if (!user1) {
            throw new global.errs.AuthorFail('此账号未注册')
        }
        const user = await User.update(
            {
                password
            }, {
            where: {
                username
            }
        })

        return user
    }

    //类的一个方法 根据id获取用户的信息
    static async getUser (uid) {
        const userInfo = await User.findOne({
            where: {
                id: uid
            }
        })
        if (userInfo) {
            return userInfo
        } else {
            throw new global.errs.NotFound('未找到用户信息')
        }
    }

    static async setUserAvaAndNickName (uid, nickName, avaUrl) {
        const result = User.update({ 'nickName': nickName, 'avaUrl': avaUrl }, {
            where: {
                id: uid
            }
        })
        if (result) {
            return true
        } else {
            throw new global.errs.HttpException('未知错误')
        }
    }


    //小程序用的登录和下发
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
    username: Sequelize.STRING(20),
    nickName: {
        type: Sequelize.STRING(12),
    },
    avaUrl: Sequelize.STRING,
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