import React, {Component} from 'react';
import {Form, Input, Icon, Button, message} from 'antd';
import { reqLogin } from '../../api';
import  widthCheckLogin from  '@conts/width-check-login';

import { connect } from 'react-redux';
import  {saveUser } from  '@redux/action-creators';

import logo from '@assets/images/logo.png'
import './index.less';

@widthCheckLogin
@connect(
    null,
    {saveUser}
)
@Form.create()
class Login extends Component {

    /**
     * 自定义表单校验规则-----【错误提示不会重复，适用于复杂校验】
     * @param rule 规则，包含了表单项的字段：field,Fullfield,type
     * @param value  表单项的值
     * @param callback  回调函数必须调用！！！ 当callback传参时，说明校验失败，并提示传入的参数信息；没有传参，说明校验成功。
     */
    validator = (rule,value,callback)=>{
        const name = rule.field === 'username'?'用户名':'密码';
        if(!value){
            return callback(`${name}不能为空`)
        }
        if(value.length<3){
            return callback(`${name}长度不能少于三位`)
        }
        if(value.length>18){
            return callback(`${name}长度不能超过18位`)
        }
        const reg=/^[a-zA-Z0-9]{3,18}$/ ;
        if(!reg.test(value)){
            return callback(`${name}只能包含英文，数字，下划线`)
        }
        callback() // callback必须调用
    }

    /**
     * 登录函数
     */
    login = (e)=>{
        //1.先禁止表单的默认行为
        e.preventDefault()

        //2.手动激活表单校验，form属性上的validateFields方法参数是一个函数。作用：校验并获取一组输入域的值
            /*
                error  校验失败报的错误对象，校验通过就是null
                values  校验通过获取的所有表单项的值
           */
        this.props.form.validateFields((error,values)=>{
            // 2.1验证通过获取表单项的值
            if(!error){
                const  { username,password } = values;

                /*  发送请求遇见了跨域问题
                        浏览器和服务器之间因为：协议，域名，端口号等因素违反了浏览器的同源策略，导致了跨域问题
                        服务器和服务器之间不存在跨域问题
                    解决：
                        1.jsonp 需要修改服务器代码
                        2.cros 需要修改服务器代码
                        3.proxy 服务器代理模式（正向代理） ---- 只能用于开发环境，不能用于线上环境
                            ---webpack中内置有proxy这个功能，默认是关闭的。
                            开启proxy: 在package.json文件的最后配置： "proxy":"http://localhost:5000"
                            原理：相当于给浏览器外面包裹了一层服务器，
                                  浏览器发送请求给代理服务器（浏览器和代理服务器的端口号需要一致），
                                  代理服务器将请求转发给目标服务器，
                                  目标服务器返回响应给代理服务器
                                  代理服务器再将响应结果返回给浏览器，从而解决跨域问题。
                        4.nginx 服务器代理模式（反向代理） 浏览器只访问代理服务器，由代理服务器将请求分发到不同的服务器上

                */


                //2.1.1 发送登录请求（本来向5000端口发送，由于跨域问题，此处要3000端口的代理服务器发送）
                reqLogin( username,password )
                    .then((result)=>{ // 请求成功,不一定就能登录成功，  reponse也可以使用解构赋值提取data属性
                     //请求成功并登录成功
                        /*
                        *   response响应返回的响应体数据是个data对象,里面有一个属性是status参照api文档知：status=0表示请求成功

                        *   登录成功，跳转到home组件
                            render中可以使用redirect，因为会解析成组件渲染到页面
                            但是在普通函数中Redirect会被解析成虚拟组件，但是无处渲染  【 return <Redirect to="/" /> 】此处不可以使用

                            <Redirect to="/" /> 用于render方法中进行重定向
                             this.props.history.replace("/")  用于非render方法/函数中进行路由跳转
                        */
                        message.success('登录成功')

                        /* 跳转页面之前先保存用户数据
                            由于登陆以后多页面都需要使用用户数据，所以最好保存到redux中（内存存储：一旦浏览器刷新数据就会丢失了），
                            所以需要做持久化存储，localstorage（持久化存储） / sessionStorage(会话存储，关闭浏览器就消失)
                            到action-cerators中保存用户数据
                         */
                        this.props.saveUser(result)

                        this.props.history.replace("/") //借助 由Route传递到组件上的form属性中的history上的push/replace方法，实现跳转路由
                    })
                    .catch(()=>{ // 无论是成功还是 .then还是.catch 都会走到finally中，不用分别写两次清空了。（ES9的语法）
                        // 清空密码框
                        this.props.form.resetFields(['password']);
                    })
            }

         })
    }

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
                    <Form onSubmit={this.login}>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'username',
                                    {
                                        rules:[
                                            /*  只适用于简单校验
                                            {required:true,message:'请输入用户名'},
                                            {min:3,message:'用户名不能少于三位'},
                                            {max:18,message:'用户名不能超过18位'},
                                            {pattern:/^[a-zA-Z0-9]{3,18}$/,message:'用户名只能包含英文，数字，下划线'}
                                            */

                                            {validator:this.validator}
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
                                            /*{required:true,message:'请输入密码'},
                                            {min:3,message:'密码不能少于三位'},
                                            {max:18,message:'密码不能超过18位'},
                                            {pattern:/^[a-zA-Z0-9]{3,18}$/,message:'密码只能包含英文，数字，下划线'}*/

                                            {validator:this.validator}
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


