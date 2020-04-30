const requireDirectory = require('require-directory')
const config = require('../config/config.js')
const Router = require('koa-router')
const hettpErr = require('./http-exception')//请求错误拦截
//项目初始化的时候 require-directory模块 自动加载所有的路由，

class InitManger{
    static initApp(app){
        InitManger.app = app
        InitManger.routerLoad()//加载路由
        InitManger.getenv()
    }
    static routerLoad(){
        const mangerPath = `${process.cwd()}/app/api/v1`
        //固定写法，加入路由
        requireDirectory(module,mangerPath,{visit:wenLoadRouter})
        function wenLoadRouter(obj){
            if(obj instanceof Router){
                InitManger.app.use(obj.routes())
            }
        }
    }
    //设置全局变量 ， 一个是连接mysql的配置， 一个是全局的http错误拦截
    static getenv(){
        global.config = config
        global.errs = hettpErr
    }
}

module.exports = InitManger