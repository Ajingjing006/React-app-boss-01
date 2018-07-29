export const AUTH_SUCCESS = Symbol('auth_success')//注册、登陆成功
export const ERROR_MSG = Symbol('ERROR_MSG')//错误信息

export const RECEIVE_USER = Symbol('RECEIVE_USER')//用户更新信息成功
export const RESET_USER = Symbol('RESET_USER')//用户更新信息成功


export const RECEIVE_USER_LIST = Symbol('RECEIVE_USER_LIST') // 接收用户列表
export const RECEIVE_MSG_LIST = Symbol('RECEIVE_MSG_LIST') // 接收所有相关消息列表
export const RECEIVE_MSG = Symbol('RECEIVE_MSG')  // 接收一条消息
export const MSG_READ = Symbol('MSG_READ') // 查看过了某个聊天消息