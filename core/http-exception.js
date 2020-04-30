//错误的类  已知错误
class HttpException extends Error {

    constructor(msg = "未知错误", code = 400, errorCode = 100001) {
        super()
        this.msg = msg
        this.code = code
        this.errorCode = errorCode
    }
}

class ParameterException extends HttpException {
    constructor(msg, erorCode) {
        super()
        this.msg = msg || '参数错误'
        this.code = 500
        this.errorCode = erorCode || 40014
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '操作成功'
        this.code = 200
        if (errorCode != '') {
            this.errorCode = errorCode || 0
        }

    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.code = 404
        this.errorCode = errorCode || 10000

    }
}

class AuthorFail extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.code = 401
        this.errorCode = errorCode || 10004

    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.code = 403
        this.errorCode = errorCode || 10006

    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthorFail,
    Forbbiden
}