const Router = require('koa-router')

const fs = require('fs')
const router = new Router({
  prefix: '/v1/loadImg'
})

router.post('/', async (ctx, next) => {
  const data = ctx.request.body.img
  const fileName = Date.now() + data.fileName
  var base64Data = data.content.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync('./upImgs/' + fileName, dataBuffer, (err, data) => {
    if (err) {
      throw new global.errs.UpLoadFail()
    }
  })
  ctx.body = {
    code: 200,
    msg: '上传成功',
    result: {
      avaUrl: 'http://service.lovetxt.xyz/upImgs/' + fileName
    }
  }
})

module.exports = router