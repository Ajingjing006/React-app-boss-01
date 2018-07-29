/**
 * 包含多个action creator
 * */
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from "../api"


function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if(!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            // debugger
            if(userid===chatMsg.from || userid===chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })

    }
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
        const {users, chatMsgs} = result.data
        // 分发同步action
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

// 接收用户列表的同步action
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
// 接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
// 读取了某个聊天消息的同步action
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

//注册异步action
export const register = (user)=>{
    const {username,password,password2,type} = user
    if(!username){
        return errorMsg('用户名必须指定')
    }
    if(password !== password2){
        return errorMsg('两次密码要一致')
    }

    //表单数据合法,返回一个发送异步ajax请求的函数
    return async dispatch => {
        //发送注册的ajax异步请求
        const response = await reqRegister({username,password,type})
        const result = response.data
        if(result.code ===0){
            //分发授权成功的同步action
            dispatch(authSuccess(result.data))
        }else{
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}

// 读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code===0) {
            const count = result.data
            dispatch(msgRead({count, from, to}))
        }
    }
}


//注册登录异步action
export const login = (user)=>{
    const {username,password,type} = user
    if(!username){
        return errorMsg('用户名必须指定')
    }
    if(!password){
        return errorMsg('密码必须指定')
    }
    return async dispatch => {
        //发送登录的ajax异步请求
        const response = await reqLogin(user)
        const result = response.data
        if(result.code ===0){
            //分发授权成功的同步action
            dispatch(authSuccess(result.data))
        }else{
            //分发错误提示信息的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = (user)=>{
    return async dispatch =>{
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code ===0){
            dispatch(receiveUser(result.data))
        }else{
            //分发错误提示信息的同步action
            debugger
            dispatch(resetUser(result.msg))
        }
    }
}


// 获取用户异步action
export const getUser = () => {
    return async dispatch => {
        // 执行异步ajax请求
        const response = await reqUser()
        const result = response.data
        if(result.code===0) { // 成功
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { // 失败
            dispatch(resetUser(result.msg))
        }
    }
}
