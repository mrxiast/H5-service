const util = require('util')

const {User} = require('../models/user')

const axios = require('axios')

const {generateToken} = require('../../core/util')
const Auth = require('../../middlewares/auth')
class WechatManger{

    static async getOpenId(code){
        let loginUrl = util.format(global.config.wx.loginUrl,global.config.wx.appId,global.config.wx.secret,code) 
        
        let result = await axios.get(loginUrl)
        if(result.status !== 200){
            throw new global.errs.AuthorFail('openId获取失败')
        }
        if(result.errcode && result.errcode !== 0){
            throw new global.errs.AuthorFail('openId获取失败：' + result.data.errcode)
        }
        const openId = result.data.openid
        return openId
    }

    static async getToken(openId){
        let userInfo = await User.getUserInfo(openId)

        if(!userInfo){

             userInfo = await User.createUserInfo(openId)

        }
        let token = await generateToken(userInfo.dataValues.id,Auth.WECHAT)
        return token

    }

}
module.exports = WechatManger