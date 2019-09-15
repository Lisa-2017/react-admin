// 管理多个路由使用数组的形式，数组里面包的是一个个的对象
import Home from "../components/home";

const  routes = [
    {
        path:'/',
        exact:true,
        component:Home
    }
] ;

export  default routes;