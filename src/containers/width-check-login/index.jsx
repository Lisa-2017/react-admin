import React, {Component} from 'react'
import  {Redirect } from  'react-router-dom'
import  { connect } from 'react-redux'


/* 高阶组件
     通过高阶组件来做登录验证的功能
     通过Route使用的组件，具有路由的三大属性 history，location，match
* */
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
            const  { token ,location,history,match} = this.props;
            const  { pathname } = location;
            if( pathname === '/login' && token )return <Redirect to="/"/>;
            if(pathname !== '/login' && !token )return <Redirect to="/login"/>;
            return <WrappedComponent location={location} history={history} match={match} />
        }
    })
}

export default widthCheckLogin