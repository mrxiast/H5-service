
//全局数据的校验器 
const { User } = require('../models/user')
const { LinValidator, Rule } = require('../../core/lin-validator')
const { LoginType } = require('../api/lib/LoginType')


// 校验参数是否为正整数
class ValidationInteger extends LinValidator {
  constructor() {
    super()
    this.id = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isInt', '参数必须为正整数', { min: 1, max: 11 })
      // new Rule ('isNotEmpty', '必须传入参数')
    ]
  }
}

// 校验Type参数是否为正整数
class ValidationTypeInteger extends LinValidator {
  constructor() {
    super()
    this.type = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isInt', '参数必须为正整数', { min: 1, max: 11 })
      // new Rule ('isNotEmpty', '必须传入参数')
    ]
  }
}

//验证电话
class ValidationPhone extends LinValidator {
  constructor() {
    super()
    this.phone = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isLength', '电话号码有误', { min: 11 }),
      // new Rule('matches', '电话号码有误', '^1[3456789]\d{9}$')
      // new Rule ('isNotEmpty', '必须传入参数')/^1[3456789]\d{9}$/
    ]
  }
}

//修改密码校验
class ResetpasswordValitor extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '用户名长度必须在6~20之间', { min: 6, max: 10 }),
    ]

    this.newpassword1 = [
      new Rule('isLength', '密码最短6位，最长32位', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]'),
      // new Rule('isNotEmpty','密码不能为空')
    ]
    this.phone = [
      new Rule('isLength', '电话格式有误', { min: 11, max: 11 }),
      // new Rule('isNotEmpty','电话不能为空')
    ]
    this.code = [
      new Rule('isLength', '验证码有误', { min: 4, max: 6 }),
      // new Rule('isNotEmpty','电话不能为空')
    ]
    this.newpassword2 = this.newpassword1

  }
  validatePassword (vals) {
    const paw = vals.body.newpassword1
    const paw1 = vals.body.newpassword2
    if (paw1 !== paw) {
      throw new Error('两次输入密码不一样！')
    }
  }
}

//注册校验
class RegisterValitor extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '用户名长度必须在6~20之间', { min: 6, max: 10 }),
    ]

    this.password = [
      new Rule('isLength', '密码最短6位，最长32位', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]'),
      // new Rule('isNotEmpty','密码不能为空')
    ]
    this.email = [
      new Rule('isEmail', '请填写正确的邮箱'),
      // new Rule('isNotEmpty','邮箱不能为空')
    ]
    this.phone = [
      new Rule('isLength', '电话格式有误', { min: 11, max: 11 }),
      // new Rule('isNotEmpty','电话不能为空')
    ]
    this.code = [
      new Rule('isLength', '验证码有误', { min: 0, max: 6 }),
      // new Rule('isNotEmpty','电话不能为空')
    ]
    this.password1 = this.password

  }
  validatePassword (vals) {
    const paw = vals.body.password
    const paw1 = vals.body.password1
    if (paw1 !== paw) {
      throw new Error('两次输入密码不一样！')
    }
  }
  async validateEmail (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error('邮箱已注册')
    }
  }
  async validateEmail (vals) {
    const username = vals.body.username
    const user = await User.findOne({
      where: {
        username: username
      }
    })
    if (user) {
      throw new Error('账号已注册')
    }
  }
}

//生成token接口的校验
class TokenValitor extends LinValidator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '帐号6~23位', { min: 6, max: 32 })
    ]
    this.password = [
      new Rule('isOptional'),
      new Rule('isLength', '密码6~23位', { min: 6, max: 128 })
    ]
  }

  validateType (vals) {
    if (!vals.body.type) {
      throw new Error('type为必填参数')
    }
    if (!LoginType.isType(vals.body.type)) {
      throw new Error('type参数不正确')
    }
  }
}


// token校验器
class NotEmptyValidtor extends LinValidator {
  constructor() {
    super()
    this.token = [
      // 这里可以添加多个校验规则，但是规则是且的关系
      // 三个参数：第一个参数：需要满足的规则，第二个参数：提示信息，第三个参数：可选参数
      new Rule('isLength', 'token不能为空', { min: 1 })
      // new Rule ('isNotEmpty', '必须传入参数')
    ]
  }
}

//验证点赞接口
class LikeValidtor extends LinValidator {
  constructor() {
    super()
    this.type = [
      new Rule('isInt', '参数必须为正整数', { min: 1 })
    ]
    this.art_id = [
      new Rule('isLength', '参数不能为空', { min: 1 })
    ]
  }
}

//验证书籍评论
class CommentValidtor extends LinValidator {
  constructor() {
    super()
    // this.id = [
    //   new Rule('isLength', '书籍ID不能为空', { min: 1 }),
    // ]
    this.type = [
      new Rule('isLength', '内容类型不能为空', { min: 1 }),
      new Rule('isInt', '参数必须为正整数', { min: 1 })
    ]
    this.ava_url = [
      new Rule('isLength', '头像不能为空', { min: 1, max: 500 }),
    ]
    this.nick_name = [
      new Rule('isLength', '昵称不能为空', { min: 1, max: 128 })
    ]
    this.content = [
      new Rule('isLength', '评论不能为空', { min: 1, max: 200 })
    ]
  }
}

//验证删除收货地址
class DelAddressValidtor extends LinValidator {
  constructor() {
    super()
    this.userId = [
      new Rule('isLength', 'userId不能为空', { min: 1 })
    ]
    this.id = [
      new Rule('isLength', 'id参数不能为空', { min: 1 })
    ]
  }
}

//验证修改收货地址
class AddOrChangeValidtor extends LinValidator {
  constructor() {
    super()
    this.userId = [
      new Rule('isLength', 'userId不能为空', { min: 1 })
    ]
    this.id = [
      new Rule('isLength', 'id参数不能为空', { min: 1 })
    ]
    this.addressDetail = [
      new Rule('isLength', '详细地址不能为空', { min: 1 })
    ]
    this.county = [
      new Rule('isLength', '区县不能为空', { min: 1 })
    ]
    this.isDefault = [
      new Rule('isLength', '默认状态不能为空', { min: 1 })
    ]
    this.name = [
      new Rule('isLength', '姓名长度为1~12', { min: 1, max: 12 })
    ]
    this.province = [
      new Rule('isLength', '省不能为空', { min: 1 })
    ]
    this.tel = [
      new Rule('isLength', '电话不能为空', { min: 1 })
    ]
  }
}

//验证添加收货地址
class AddAddressValidtor extends LinValidator {
  constructor() {
    super()
    this.addressDetail = [
      new Rule('isLength', '详细地址不能为空', { min: 1 })
    ]
    this.county = [
      new Rule('isLength', '区县不能为空', { min: 1 })
    ]
    this.isDefault = [
      new Rule('isLength', '默认状态不能为空', { min: 1 })
    ]
    this.name = [
      new Rule('isLength', '姓名长度为1~12', { min: 1, max: 12 })
    ]
    this.province = [
      new Rule('isLength', '省不能为空', { min: 1 })
    ]
    this.tel = [
      new Rule('isLength', '电话不能为空', { min: 1 })
    ]
  }
}

//验证添加收货地址
class AddCartValidtor extends LinValidator {
  constructor() {
    super()
    this.skuId = [
      new Rule('isLength', '商品不能为空', { min: 1 })
    ]
  }
}

//验证提交订单
class AddOrderValidtor extends LinValidator {
  constructor() {
    super()
    this.orderInfo = [
      new Rule('isLength', '订单信息不能为空', { min: 1 })
    ],
      this.addressId = [
        new Rule('isLength', '地址不能为空', { min: 1 })
      ],
      this.allPrice = [
        new Rule('isLength', '总价不能为空', { min: 1 })
      ]
  }
}

module.exports = {
  ValidationInteger,
  RegisterValitor,
  TokenValitor,
  NotEmptyValidtor,
  LikeValidtor,
  CommentValidtor,
  ValidationPhone,
  ResetpasswordValitor,
  ValidationTypeInteger,
  DelAddressValidtor,
  AddOrChangeValidtor,
  AddAddressValidtor,
  AddCartValidtor,
  AddOrderValidtor
}