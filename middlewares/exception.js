const { HttpException } = require('../core/http-exception.js')
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
                errorUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: '内部异常',
                errorCode: 999,
                errorUrl: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError