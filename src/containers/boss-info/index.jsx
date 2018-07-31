import React,{Component} from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    List,
    WhiteSpace,
    WingBlank,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import HeaderSelector from '../../components/headerSelector'
import {updateUser} from '../../redux/actions'
class BossInfo extends Component {
    constructor() {
        super()
        this.state = {
            header: '', // 头像名称
            info: '', // 职位简介
            post: '', // 职位名称
            company: '', // 公司名称
            salary: '' // 工资
        }
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }
    handleChange = (type, val) => {
        this.setState({
            [type]: val
        })
    }

    handleSave = () => {
        this.props.updateUser(this.state)
    }

    render() {
    	let {redirectTo} = this.state;
		    if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar className='topNavBarClass'>BOSS信完善</NavBar>
                <List className='mainsection'>
                    <HeaderSelector setHeader={this.setHeader}/>
                    <InputItem placeholder='请输入招聘职位' onChange={(val) => this.handleChange('post',val)}>招聘职位:</InputItem>
                    <InputItem placeholder='请输入公司名称' onChange={(val) => this.handleChange('company',val)}>公司名称:</InputItem>
                    <InputItem placeholder='请输入职位薪资' onChange={(val) => this.handleChange('salary',val)}>职位薪资:</InputItem>
                    <InputItem placeholder='请输入职位要求' onChange={(val) => this.handleChange('info',val)}>职位要求:</InputItem>
                </List>
                <Button type='primary' className='bottonButon' onClick={this.handleSave}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({
        user: state.userX
    }),
    {updateUser}
)(BossInfo)
