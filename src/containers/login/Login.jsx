import React,{Component} from 'react'
import Logo from '../../components/logo/logo.jsx'
import {NavBar,
    WhiteSpace,
    List,
    InputItem,
    Button,
    Icon
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions.js'
import {loginLbels} from '../../labels.js'
import {registerLbels} from "../../labels";
const ListItem = List.Item;
class Login extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            password2:'',
            type:''
        }
    }
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }
    loginHandle = ()=>{
        this.props.login(this.state)
    }
    toRegisterHandle = ()=>{
        this.props.history.replace('/register')
    }
    render(){
        const {msg,redirectTo} = this.props.userData
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>{loginLbels.maintitle}</NavBar>
                <WhiteSpace/>
                <Logo/>
                <List>
                    {msg?<div className='error-msg'>{msg}</div>:null}
                    <WhiteSpace/>
                    <InputItem placeholder={loginLbels.usernametipslbl} onChange={val=>{this.handleChange('username',val)}}>{loginLbels.usernamelbl}</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' placeholder={loginLbels.passwordtipslbl} onChange={val=>{this.handleChange('password',val)}} >{loginLbels.passwordlbl}</InputItem>
                    <WhiteSpace/>
                    <Button onClick={this.loginHandle} type='primary'>{loginLbels.loginlbl}</Button>
                    <Button onClick={this.toRegisterHandle}>{loginLbels.registernewlbl}</Button>
                </List>
                <WhiteSpace/>
            </div>
        )
    }
}
export default connect(
    state => ({userData:state.userX}),
    {login}
)(Login)