// 管理多个路由使用数组的形式，数组里面包的是一个个的对象
import Login from "../components/login";
import Home from "../components/home";

const  routes = [
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/login',
        exact:true,
        component:Login
    },
] ;

export  default routes;