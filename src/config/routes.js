// 管理多个路由使用数组的形式，数组里面包的是一个个的对象
import Home from "../components/home";
import Category from "../containers/category";
import Product from '@conts/product';
import SaveUpdate from '@conts/product/save-update';

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
    },
    {
        path:'/product/saveupdate',
        exact:true,
        component:SaveUpdate
    },
] ;

export  default routes;