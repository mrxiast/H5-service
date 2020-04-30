const basicAuth = require('basic-auth')

const jwt = require('jsonwebtoken')
class Auth {
    constructor() {
        Auth.WECHAT = 10
        Auth.ADMIN = 20
    }

    get m () {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不能为空'
            if (!userToken) {
                throw new global.errs.Forbbiden(errMsg)
            }

            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }

                throw new global.errs.Forbbiden(errMsg)
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            await next()
        }
    }
    static verifyToken (token) {
        try {
            jwt.verify(userToken.name, global.config.security.secretKey)
            return true
        } catch (error) {
            throw new global.errs.Forbbiden(errMsg)
            return false
        }
    }
}
module.exports = Auth