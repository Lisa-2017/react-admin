import React, {Component} from 'react'
import {Form, Input, Icon, Button} from 'antd'

import logo from './logo.png'
import './index.less'



@Form.create()
class Login extends Component {

    render() {
        // const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
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
                            {/*{getFieldDecorator('username', {
                                rules: [
                                    {required: true, message: '请输入用户名!'},
                                    {min: 3, message: '用户名不能少于3位'},
                                    {max: 13, message: '用户名不能多于13位'},
                                    {pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线'}
                                ],
                            })()
                            }*/}
                            <Input perfix={<Icon type="user"/>} placeholder="用户名"/>
                        </Form.Item>
                        <Form.Item>
                           {/* {
                                getFieldDecorator('password', {
                                    rules: [
                                        {required: true, message: '请输入密码!'},
                                        {min: 6, message: '密码不能少于6位'},
                                        {max: 18, message: '密码不能多于18位'},
                                        {pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线'}
                                    ]
                                })()
                                <Input perfix={<Icon type="lock"/>} placeholder="密码" type="password"/>
                            }*/}
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


