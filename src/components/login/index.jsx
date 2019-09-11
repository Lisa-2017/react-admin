import React, {Component} from 'react'
import {Form, Input, Icon, Button, message} from 'antd'


import logo from './logo.png'
import './index.less'

@Form.create()
class Login extends Component {



    render() {
        // 因为使用了Form.create方法，Login组件上面有了form属性，此处通过解构赋值获取form属性里面的 getFieldDecorator方法
        const { getFieldDecorator } = this.props.form  // getFieldDecorator是一个高级组件，专门用来做表单验证的方法

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
                            {
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules:[
                                            {required:true,message:'请输入用户名'},
                                            {min:3,message:'用户名不能少于三位'},
                                            {max:18,message:'用户名不能超过18位'},
                                            {pattern:/^[a-zA-Z0-9]{3,18}$/,message:'用户名只能包含英文，数字，下划线'}
                                        ]
                                    }
                                )( <Input perfix={<Icon type="user"/>} placeholder="用户名"/> )

                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {required:true,message:'请输入密码'},
                                            {min:3,message:'密码不能少于三位'},
                                            {max:18,message:'密码不能超过18位'},
                                            {pattern:/^[a-zA-Z0-9]{3,18}$/,message:'密码只能包含英文，数字，下划线'}
                                        ]
                                    }
                                    )(<Input perfix={<Icon type="lock"/>} placeholder="密码" type="password"/>)
                            }

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
/*  Form.create 是一个高阶组件：用来给Login组件传递 form属性（form 属性上面有很多操作表单的方法）
    // const newLogin = Form.create()(Login);
    // export default newLogin;
    // 改写为：使用装饰器的用法：在定义组件的最上方写 @Form.create()，可以省略第二次调用，并默认将下面的组件作为参数传递进去。
*/

export default Login;


