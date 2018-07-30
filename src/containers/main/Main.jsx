import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import BossInfo from '../boss-info'
import DashenInfo from '../dashen-info'
import Boss from '../boss'
import Dashen from '../dashen'
import Message from '../message'
import Personal from '../personal'
import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import NavFooter from '../../components/navFooter'
class Main extends Component {
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: 'Boss列表',
            icon: 'laoban',
            text: 'Boss',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]
    constructor(){
        super()
    }
    componentDidMount () {
        //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id) {
            // 发送异步请求, 获取user
            // console.log('发送ajax请求获取user')
            this.props.getUser()
        }
    }
    render(){
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有, 自动重定向到登陆界面
        if(!userid) {
            return <Redirect to='/login'/>
        }
        // 如果有,读取redux中的user状态
        const {user, unReadCount} = this.props
        // 如果user有没有_id, 返回null(不做任何显示)
         //debugger
        if(!user._id) {
            return null
        } else {
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            let path = this.props.location.pathname
            if(path==='/') {
                // 得到一个重定向的路由路径
                let newPath = getRedirectTo(user)
                return <Redirect to= {newPath}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有

        if(currentNav) {
            // 决定哪个路由需要隐藏
            if(user.type==='laoban') {
                // 隐藏数组的第2个
                navList[1].hide = true
            } else {
                // 隐藏数组的第1个
                navList[0].hide = true
            }
        }

        return (
            <div>
                <Switch>
                    {
                        this.navList.map((item,index)=>{
                            return <Route path={item.path} key={item.path} component={item.component}></Route>
                        })
                    }
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/dasheninfo' component={DashenInfo}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}
export default connect(
    state => ({user:state.userX}),
    {getUser}
)(Main)