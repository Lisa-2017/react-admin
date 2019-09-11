import React, {Component} from 'react'
import {Form, Input, Icon, Button, message} from 'antd'


import logo from './logo.png'
import './index.less'

class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-body">
                    <h3>用户登录</h3>
                    <Form>
                        <Form.Item>
                            <Input perfix={<Icon type="user"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item>
                            <Input perfix={<Icon type="lock"/>} placeholder="密码" type="password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录 </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
// const newLogin = Form.create()(Login);
// export default newLogin;

export default Login;


