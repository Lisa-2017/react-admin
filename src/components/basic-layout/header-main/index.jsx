import React, {Component} from 'react'
import {Button,Icon} from "antd";
import './index.less'

class HeaderMain extends Component {
    render() {
        return (
            <div className="header-main">
                <div  className="header-main-top">
                    <Button size="small"><Icon type='fullscreen' /></Button>
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