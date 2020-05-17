const Koa = require('koa')

const koaBody = require('koa-bodyparser')

const catchError = require('./middlewares/exception.js')

const KoaStatic = require('koa-static');

const cors = require('koa2-cors');

const toHump = require('./middlewares/toHump')



//如果没有user表这里可以创建 
require('./app/models/user.js')
//如果没有img表这里可以创建 
require('./app/models/imgs.js')
//如果没有地址表这里可以创建 
require('./app/models/address.js')

const app = new Koa()
app.use(cors())
app.use(KoaStatic('./'))
// app.use(KoaStatic(
//     path.join(__dirname, './static')
// ))
//必须先写body中间件
app.use(koaBody())
app.use(catchError)

app.use(toHump) // 需要放在引用路由之前,下划线转透风命名
//初始化的工具类 自动导入api下所有路由并注册
const InitManger = require('./core/init.js')
InitManger.initApp(app)




app.listen(3000, function () {
    console.log('3000起了')
})