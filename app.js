const Koa = require('koa')

const koaBody = require('koa-bodyparser')

const catchError = require('./middlewares/exception.js')

const KoaStatic = require('koa-static');

const cors = require('koa2-cors');




require('./app/models/user.js')

const app = new Koa()
app.use(cors())
app.use(KoaStatic('./'))
// app.use(KoaStatic(
//     path.join(__dirname, './static')
// ))
//必须先写body中间件
app.use(koaBody())
app.use(catchError)


//初始化的工具类 自动导入api下所有路由并注册
const InitManger = require('./core/init.js')
InitManger.initApp(app)




app.listen(3000, function () {
    console.log('3000起了')
})