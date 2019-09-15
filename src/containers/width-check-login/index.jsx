import React, {Component} from 'react'
import  {Redirect } from  'react-router-dom'
import  { connect } from 'react-redux'


// 通过高阶组件来做登录验证的功能
function widthCheckLogin(WrappedComponent) {
    return connect(
        (state)=>({token:state.user.token}),null
    )(class  extends Component {
        static  displayName =`CkeckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        render() {
            /* 登录校验
                判断当前地址是否是/login：如果没登录路由指向Login,已登录路由指向首页
                判断当前地址是否是/，如果没登录路由指向Login,已登录路由指向首页
            */

            // 当前路径
            const  { token ,location:{pathname}} = this.props
            if( pathname === '/login' && token )return <Redirect to="/"/>
            if(pathname !== '/login' && !token )return <Redirect to="/login"/>
            return <WrappedComponent/>
        }
    })
}

export default widthCheckLogin