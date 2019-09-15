// 封装axios代码
import  axios from 'axios'
import store from '../redux/store'
import { message} from "antd";

// 创建axios的实例
const instance = axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000
    //headers;{}
});

// 设置请求拦截器：发送请求之前触发的函数
instance.interceptors.request.use(
    (config)=>{
        const { token } =store.getState().user
        // 加上公共的请求头参数,但是 路由：/api/login 不需要加上请求头参数(判断token是否有值)
        //config 就是发送请求的配置信息（请求方法，请求头，请求参数。。。）
        if(token){
            config.headers.authorization = token;
        }
        return config
    },
    /*(err)=>{ //失败后返回失败的Promise
        return Promise.reject(err)
    }*/
)


// 设置响应拦截器：处理响应之前触发的函数
instance.interceptors.response.use(
    (response)=>{
        //请求成功
        // result 是响应体数据
        const  result = response.data
        if(result.status===0){
            return result.data; // 功能成功
        }else {
            //功能失败----触发catch
            // 错误提示
            message.error(result.msg);
            return Promise.reject(result.msg);
        }

    },
    (error)=>{
        console.log('axios 请求失败'+error); // 开发调试时打印输出
        // 请求失败 -->响应状态码为4xx ，5xx
        message.error('网络错误，请联系管理员');
        return Promise.reject('网络错误请联系管理员')
    }
)


export  default  instance