import React,{Component} from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class HeaderSelector extends Component {
    static propTypes = {
        // setHeader: PropTypes.fun.isRequired
    }
    constructor() {
        super()
        this.state = {
            icon: null
        }
    }
    selectHeader = ({text,icon}) => {
        this.props.setHeader(text)
        this.setState({icon})
    }
    getHeaderList = () => {
        if (!this.headerList) {
            let headerList = []
            for (let i=1; i <= 20; i++) {
                let text = `头像${i}`
                headerList.push({
                    text,
                    icon: require(`../../assets/images/${text}.png`)
                })
            }

            this.headerList = headerList
        }
        return this.headerList
    }

    render() {
        let {icon} = this.state
        let headertext = icon
	        ?(<span>以选择头像:<img src={icon}></img></span>)
	        :'请选择头像'

        return (
            <List renderHeader={() => headertext}>
                <Grid data={this.getHeaderList()} columnNum={6} onClick={this.selectHeader}/>
            </List>
        )
    }
}
export default HeaderSelector
