import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from '../action-types'
import {getRedirectTo} from '../../utils'
const initUser = {
    username:'',
    type:'',//用户类型
    msg:'',//错误提示信息
    redirectTo:''//需要重定向的路由路径
}
function userX(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, redirectTo: '/'}
        case ERROR_MSG:
            return {...state, msg: action.data}
	    case RECEIVE_USER:
            return action.data
        case RESET_USER: // data是msg
            return {...initUser, msg: action.data}
        default:
            return state;
    }
}

export default {
    userX
}
