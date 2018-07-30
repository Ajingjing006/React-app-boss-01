import React,{Component} from 'react'
import Logo from '../../components/logo/logo.jsx'
import {NavBar,
    WhiteSpace,
    WingBlank,
    List,
    InputItem,
    Button,
    Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/actions'
import {registerLbels} from '../../labels.js'
const ListItem = List.Item;
class Register extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            password:'',
            password2:'',
            type:''
        }
    }
    registerHandle = ()=>{
        this.props.register(this.state)
    }
    handleChange = (name,val)=>{
       this.setState({
           [name]:val
       })
    }
    toLoginHandle = ()=>{
        this.props.history.replace('/login')
    }
    render(){
        const {msg,redirectTo} = this.props.userData
        if(redirectTo){
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>{registerLbels.maintitle}</NavBar>
                <WhiteSpace/>
                <Logo/>
                <List>
                    {msg?<div className='error-msg'>{msg}</div>:null}
                    <WhiteSpace/>
                    <InputItem placeholder={registerLbels.usernametipslbl} onChange={val=>{this.handleChange('username',val)}}>{registerLbels.usernamelbl}</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' placeholder={registerLbels.passwordtipslbl} onChange={val=>{this.handleChange('password',val)}}>{registerLbels.passwordlbl}</InputItem>
                    <WhiteSpace/>
                    <InputItem type='password' placeholder={registerLbels.passwordtips2lbl} onChange={val=>{this.handleChange('password2',val)}}>{registerLbels.password2lbl}</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                        <span>{registerLbels.usertypelbl}</span>
                        <Radio checked={this.state.type == 'boss'} onChange={val=>{this.handleChange('type','boss')}}>{registerLbels.usertype1lbl}</Radio>
                        <Radio checked={this.state.type == 'dashen'}  onChange={val=>{this.handleChange('type','dashen')}}>{registerLbels.usertype2lbl}</Radio>
                    </ListItem>
                    <Button onClick={this.registerHandle} type='primary'>{registerLbels.registerlbl}</Button>
                    <Button onClick={this.toLoginHandle} >{registerLbels.loginoldlbl}</Button>
                </List>
                <WhiteSpace/>
            </div>
        )
    }
}
export default connect(
    state => {
        return {userData:state.userX}//此处表示的是对于redux的全部状态，{
        // user:{
        //
        // }
        // }
    },
    {register}
)(Register)