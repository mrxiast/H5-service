module.exports = {
    env: 'dev',
    //本地测试
    // database: {
    //     dbName: 'test',
    //     host: 'localhost',
    //     port: '3306',
    //     user: 'root',
    //     password: '123456'
    // },
    //发布线上
    database: {
        dbName: 'road',
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'Xia199208.'
    },
    //本地线上
    // database: {
    //     dbName: 'road',
    //     host: '203.195.222.243',
    //     port: '3306',
    //     user: 'root',
    //     password: 'Xia199208.'
    // },

    security: {
        secretKey: '2e61bb59e7',
        expiresIn: 60 * 60 * 1 * 1000
    },
    wx: {
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
        appId: 'wx6e06eeb60ab7f885',
        secret: '1a488afe8f2fec820263ee2d9ae3718e'
    }
}