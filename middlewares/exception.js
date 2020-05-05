const { HttpException,ParameterException } = require('../core/http-exception.js')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.config.env === 'dev'
        if (!isHttpException && isDev) {
            throw error
        }
        if (error instanceof HttpException) {
            ctx.body = {
                msg: error.msg,
                errorCode: error.errorCode,
                errorUrl: `${ctx.method} ${ctx.path}`,
                code:error.code
            }
            ctx.status = 200
        } else {
            ctx.body = {
                msg: 'we made a mistake',
                errorCode: 999,
                errorUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError