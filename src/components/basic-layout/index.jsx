import React, {Component} from 'react'
import {Layout} from 'antd';
import widthCheckLogin from  '@conts/with-check-login'
import HeaderMain from  './header-main'

import LeftNav from './left-nav'
import logo from '@assets/images/logo.png'
import  './index.less'


const {Header, Content, Footer, Sider} = Layout;

@widthCheckLogin
class BasicLayout extends Component {
    state = {
        collapsed: false,
        isDisplay:true
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
            collapsed,
            isDisplay:!this.state.isDisplay
        });

    };

    render() {
        const { collapsed ,isDisplay } =this.state
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="basic-layout-logo">
                        <img src={logo} alt="logo"/>
                        <h1 style={{display:isDisplay ? 'block' : 'none'}}>后台管理系统</h1>
                    </div>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0,height:'80px'}}>
                        <HeaderMain/>
                    </Header>
                    <Content style={{margin: '30px 16px'}}>

                        <div style={{padding: 24, background: '#fff', minHeight: 560}}>
                            {
                                this.props.children
                            }
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>后台管理系统 ©2019 Created by Lisa</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout