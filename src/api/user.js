import request from '@/utils/request'

/**
 * 用户基本信息
 * @param data object 用户信息
 */
export function authUserInfoAu(data) {
    return request.post('auth/user/info/au', data, { login: false })
}

/**
 * 用户个人中心
 * @param {*} data  
 */
export function userAdminIndex() {
    return request.post('user/userInfo/userAdminIndex', {}, { login: true })
}

/**
 * 用户个人中心 推荐岗位列表
 * @param {*} data 
 */
export function getRecommendPostList(data) {
    return request.post('user/userInfo/getRecommendPostList', data, { login: true })
}


/******************************   登录   ********************************************/
/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
    return request.post('auth/login', data, { login: false })
}

/**
 * 获取二维码
 */

export function getAccountQrcodeUrl() {
    return request.get('auth/getAccountQrcodeUrl',{}, { login: false })
}

/**
 * 微信轮询登录
 */
export function wechatPollingLogin(uu_str) {
    return request.post('auth/wechatPollingLogin', {uu_str:uu_str},{ login: false })
}

/**
 * 用户退出登录
 */
export function logout() {
    return request.get('auth/logout', {}, { login: false })
}
/**
 * 用户发送验证码
 * @param data object 手机号&验证码
 */
export function registerVerify(data) {
    return request.post('auth/code/verify', data, { login: false })
}
/**
 * 用户注册
 * @param data object 手机号&验证码$密码
 */
export function register(data) {
    return request.post('auth/phone/register', data, { login: false })
}

/**
 * 用户手机号修改密码
 * @param data object 用户手机号 验证码 密码
 */
export function registerReset(data) {
    return request.post('auth/reset/pwd', data, { login: false })
}

// 获取用户信息
export function getUserInfo (person_reg_state) {
    // auth/user/info
    return request.post('auth/user/base/info',{person_reg_state: person_reg_state}, {login: true})
}
// 教育经历列表
export function getUserregisterEduList(person_reg_state) {
    return request.get('recruit/user/edu/list', {person_reg_state: person_reg_state}, { login: true })
}
/**
 * 获取机构基本信息
 */
export function getUserOrgInfo (data) {
    return request.post('auth/user/org/info',data, {login: true})
}
/**
 * 企业端完善个人信息
 */
export function authUserOrgAu (data) {
    return request.post('auth/user/org/au',data, {login: true})
}
/**
 * 注册填写公司信息
 */
export function authUserOrgPerfect (data) {
    return request.post('auth/user/org/perfect',data, {login: true})
}
/**
 * 确认公司需求新增
 */
export function authUserOrgNeedAu (data) {
    return request.post('auth/user/org/need/au',data, {login: true})
}
// 企业中心个人资料修改
export function authUserOrgEdit (data) {
    return request.post('user/userOrg/editUserOrg', data, {login: true})
}
// 企业中心个人资料拉取
export function getUserOrgData () {
    return request.post('user/userOrg/getUserOrg', {}, {login: true})
}
// 企业中心企业信息资料拉取
export function getOrgInfoData () {
    return request.post('user/userOrg/getOrgInfo', {}, {login: true})
}
/**
 * 消息中心 消息列表
 */
export function getSystemMessageList (data) {
    return request.post('user/getSystemMessageList',data, {login: true})
}

/**
 * 消息状态改变 
 */
export function setSystemMessageRead (id) {
    return request.post('user/setSystemMessageRead',{ms_id:id}, {login: true})
}

// /**
//  * 用户手机号登录
//  * @param data object 用户手机号 也只能
//  */
// export function loginMobile(data) {
//     return request.post('/auth/login/mobile', data, { login: false })
// }

// /**
//  * 用户发送验证码
//  * @param data object 用户手机号
//  */
// export function registerVerify(data) {
//     return request.post('/auth/register/verify', data, { login: false })
// }

// /**
//  * 用户手机号注册
//  * @param data object 用户手机号 验证码 密码
//  */
// export function register(data) {
//     return request.post('/auth/register', data, { login: false })
// }

// /*
//  * 领取优惠券列表
//  * */
// export function getCoupon(q) {
//     return request.get('/auth/coupons', q, { login: false })
// }

// /*
//  * 点击领取优惠券
//  * */
// export function getCouponReceive(id) {
//     return request.post('/auth/coupon/receive', { couponId: id }, { login: true })
// }

// /*
//  * 批量领取优惠券
//  * */
// export function couponReceiveBatch(couponId) {
//     return request.post('/auth/coupon/receive/batch', { couponId })
// }

// /*
//  * 我的优惠券
//  * */
// export function getCouponsUser(type) {
//     return request.get('/auth/coupons/user/' + type)
// }

/*
 * 个人中心
 * */
export function getUser() {
    return request.get('auth/user')
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
    return request.get('auth/menu/user')
}

/*
 * 地址列表
 * */
export function getAddressList(data) {
    return request.get('auth/address/list', data || {})
}

/*
 * 删除地址
 * */
export function getAddressRemove(id) {
    return request.post('auth/address/del', { id: id })
}

// /*
//  * 设置默认地址
//  * */
// export function getAddressDefaultSet(id) {
//     return request.post('/auth/address/default/set', { id: id })
// }

// /*
//  * 获取默认地址
//  * */
// export function getAddressDefault() {
//     return request.get('/auth/address/default')
// }

// /*
//  * 获取单个地址
//  * */
// export function getAddress(id) {
//     return request.get('/auth/address/detail/' + id)
// }

// /*
//  * 修改 添加地址
//  * */
// export function postAddress(data) {
//     return request.post('/auth/address/edit', data)
// }

// /*
//  * 获取收藏产品
//  * */
// export function getCollectUser(page, limit) {
//     return request.get('/auth/collect/user', { page: page, limit: limit })
// }

// /*
//  * 删除收藏产品
//  * */
// export function getCollectDel(id, category) {
//     return request.post('/auth/collect/del', { id: id, category: category })
// }

// /*
//  * 批量收藏产品
//  * */
// export function postCollectAll(data) {
//     return request.post('/auth/collect/all', data)
// }

// /*
//  * 添加收藏产品
//  * */
// export function getCollectAdd(id, category) {
//     return request.post('collect/add', { id: id, category: category })
// }

// /*
//  * 签到配置
//  * */
// export function getSignConfig() {
//     return request.get('/auth/sign/config')
// }

// /*
//  * 签到里的签到列表
//  * */
// export function getSignList(page, limit) {
//     return request.get('/auth/sign/list', { page: page, limit: limit })
// }

// /*
//  * 签到列表
//  * */
// export function getSignMonth(page, limit) {
//     return request.get('/auth/sign/month', { page: page, limit: limit })
// }

// /*
//  * 签到用户信息
//  * */
// export function postSignUser(sign) {
//     return request.post('/auth/sign/user', sign)
// }

// /*
//  * 签到
//  * */
// export function postSignIntegral(sign) {
//     return request.post('/auth/sign/integral', sign)
// }

// /*
//  * 推广数据
//  * */
// export function getSpreadInfo() {
//     return request.get('/auth/commission')
// }

// /*
//  * 推广人列表
//  * */
// export function getSpreadUser(screen) {
//     return request.post('/auth/spread/people', screen)
// }

// /*
//  * 推广人订单
//  * */
// export function getSpreadOrder(where) {
//     return request.post('/auth/spread/order', where)
// }

// /*
//  * 资金明细（types|0=全部,1=消费,2=充值,3=返佣,4=提现）
//  * */
// export function getCommissionInfo(q, types) {
//     return request.get('/auth/spread/commission/' + types, q)
// }

// /*
//  * 积分记录
//  * */
// export function getIntegralList(q) {
//     return request.get('/auth/integral/list', q)
// }

// /*
//  * 提现银行
//  * */
// export function getBank() {
//     return request.get('/auth/extract/bank')
// }

// /*
//  * 提现申请
//  * */
// export function postCashInfo(cash) {
//     return request.post('/auth/extract/cash', cash)
// }

// /*
//  * 会员中心
//  * */
// export function getVipInfo() {
//     return request.get('/auth/user/level/grade')
// }

// /*
//  * 会员等级任务
//  * */
// export function getVipTask(id) {
//     return request.get('/auth/user/level/task/' + id)
// }

// /*
//  * 资金统计
//  * */
// export function getBalance() {
//     return request.get('/auth/user/balance')
// }

// /*
//  * 活动状态
//  * */
// export function getActivityStatus() {
//     return request.get('/auth/user/activity', {}, { login: false })
// }

// /*
//  * 活动状态
//  * */
// export function getSpreadImg() {
//     return request.get('/auth/spread/banner')
// }

// /*
//  * 用户修改信息
//  * */
// export function postUserEdit(data) {
//     return request.post('/auth/user/edit', data)
// }

// /*
//  * 用户修改信息
//  * */
// export function getChatRecord(uid, data) {
//     return request.get('user/service/record/' + uid, data)
// }

// /*
//  * 用户修改信息
//  * */
// export function serviceList() {
//     return request.get('user/service/list')
// }

// /*
//  * 公众号充值
//  * */
// export function rechargeWechat(data) {
//     return request.post('/auth/recharge/wechat', data)
// }

// /*
//  * 退出登录
//  * */
// export function getLogout() {
//     return request.get('/auth/logout')
// }

// /*
//  * 绑定手机号
//  * */
// export function bindingPhone(data) {
//     return request.post('binding', data)
// }

// /*
//  * h5切换公众号登陆
//  * */
// export function switchH5Login() {
//     return request.post('switch_h5', { from: 'wechat' })
// }