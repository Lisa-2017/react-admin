import React, {Component} from 'react'
import {Button,Icon,Modal} from "antd";
import { connect } from 'react-redux';
import  screenfull from 'screenfull'
import dayjs from 'dayjs'


import { removeUser } from '@redux/action-creators';
import './index.less'




@connect(
    (state) => ({
        username: state.user.user.username,
        title: state.title
    }),
    { removeUser }
)
class HeaderMain extends Component {
    state={
        isScreenFull:false,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
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
        setInterval((state)=>{
            this.setState({
                time: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        },1000)
    }
    componentWillUnmount() {
        screenfull.off('change',this.change)
    }

    loginout = () => {
        // console.log(111);
        // 显示对话框
        Modal.confirm({
            title: '您确认要退出登录吗？',
            onOk:()=>{
                this.props.removeUser();
            },
            okText:"确认",
            cancelText:"取消"
        })

    };

    render() {
        const { isScreenFull,time } =this.state;
        const { username, title} = this.props;
        return (
            <div className="header-main">
                <div  className="header-main-top">
                    <Button size="small" onClick={this.screenfull}><Icon type={isScreenFull?'fullscreen-exit':'fullscreen'} /></Button>
                    <Button size="small" >English</Button>
                    <span> 欢迎,{username}</span>
                    <Button type="link" onClick={this.loginout} >退出</Button>
                </div>
                <div  className="header-main-bottom">
                    <h3>{title}</h3>
                    <span>{time}</span>
                </div>
            </div>
        )
    }
}

export default HeaderMain