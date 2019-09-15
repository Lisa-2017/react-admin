import React, {Component} from 'react';
import { BrowserRouter as Router , Route ,Switch} from 'react-router-dom'
import NotMatch from '@comps/not-match'
import BasicLayout from '@comps/basic-layout'
import  routes from  './config/routes'




 class App extends Component {
    render() {
        return (
            <Router>
                {/*  方式一：   注意顺序：就可匹配到login,如果顺序调换则总是匹配到跟路由
                <Switch>
                    <Route path="/login" component={ Login } />
                    <Route path="/"  component={ Home } />
                </Switch>
                */}

                {/* 方式二： exact 严格匹配路由
                <Route path="/" exact component={ Home } />
                <Route path="/login" component={ Login } />
                */}

                {/* 方式三： 创建一个路由组件专门管理路由组件 【推荐】*/}
                <BasicLayout>
                    <Switch>
                        {
                            routes.map((route,index)=>{
                                // return <Route path={route.path} exact={route.exact} component={route.component} />
                                // 因为不需要动态增删改，所以此处可以使用index 标识key
                                return <Route  {...route} key={index}/>
                            })
                        }
                        {/*省略path属性不写，就是匹配所有路径*/}
                        <Route  component={NotMatch}/>
                    </Switch>
                </BasicLayout>
            </Router>
        )
    }
}


export default App