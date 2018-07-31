const defaultLbls = {
    usernamelbl: '用户名:',
    passwordlbl: '密码:',
    usernametipslbl: '请输入用户名',
    passwordtipslbl: '请输入密码',
    loginlbl: '登录',
    maintitle: 'Boss直聘'
}
const loginLbels = Object.assign(defaultLbls,
	{
		registernewlbl:'注册新账户'
	}
)
const registerLbels = Object.assign(defaultLbls,
	{
	    password2lbl: '确认密码:',
	    passwordtips2lbl: '请输入确认密码',
	    usertypelbl: '用户类型:',
	    usertype1lbl: 'Boss',
	    usertype2lbl: '大神',
	    registerlbl: '注册',
	    loginoldlbl: '登录已有账户'
	}
)

export {
    loginLbels,
    registerLbels
}
