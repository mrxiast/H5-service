

function isType(val){
    for(let key in this){
        if(this[key] == val){
            return true
        }
    }
    return false
}
const LoginType = {
    WECHAT_LOGIN:'100',
    EMAIL_LOGIN:'101',
    PHONE_LOGIN:'102',
    isType
}

module.exports = {LoginType}