//错误的类  已知错误
class HttpException extends Error {

    constructor(msg = "服务器异常", code = 400, errorCode = 10000) {
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
        this.code = 400
        this.errorCode = erorCode || 40001
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '操作成功'
        this.code = 200
        this.errorCode = errorCode || 0

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

class UpLoadFail extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '上传失败'
        this.code = 413
        this.errorCode = errorCode || 10006

    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthorFail,
    Forbbiden,
    UpLoadFail
}