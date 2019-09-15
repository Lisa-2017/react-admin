import React, {Component} from 'react'
import {Button,Icon} from "antd";
import './index.less'
import  screenfull from 'screenfull'

class HeaderMain extends Component {
    state={
        isScreenFull:false
    }
    screenfull=()=>{
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    };
    change =()=>{
        this.setState({
            isScreenFull:!this.props.isScreenFull
        })
    }

    componentDidMount() {
        // 绑定推出全屏事件
        screenfull.on('change',this.change)
    }
    componentWillUnmount() {
        screenfull.off('change',this.hange)
    }

    render() {
        const { isScreenFull } =this.state
        return (
            <div className="header-main">
                <div  className="header-main-top">
                    <Button size="small" onClick={this.screenfull}><Icon type={isScreenFull?'fullscreen-exit':'fullscreen'} /></Button>
                    <Button>English</Button>
                    <span> 欢迎，xxx</span>
                    <Button type="link">退出</Button>
                </div>
                <div  className="header-main-bottom">
                    <h3>首页</h3>
                    <span>2019-09-16 1:08:54</span>
                </div>
            </div>
        )
    }
}

export default HeaderMain