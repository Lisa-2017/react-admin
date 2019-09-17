// 管理多个路由使用数组的形式，数组里面包的是一个个的对象
import Home from "../components/home";
import Category from "../containers/category";
import Product from '@conts/product';

const  routes = [
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/category',
        exact:true,
        component:Category
    },
    {
        path:'/product',
        exact:true,
        component:Product
    }
] ;

export  default routes;