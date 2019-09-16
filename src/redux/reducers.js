/*
    根据之前的 prevState 和 action 来生成 newState
*/

import  { combineReducers } from  'redux'
import {
    SAVE_USER,
    REMOVE_USER,
    SET_TITLE ,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS
} from './action-types'
import {setItem, getItem, removeItem} from '../utils/storage'



// 初始化数据
const initUser={ // 2.读取localstorage里的数据存储到redux中，如果有就读取并存储，如果没有就初始化为空
    user:getItem('user') || {},
    token:getItem('token') || ''
}

// reducer函数必须设置默认状态值，不写默认为undefined,会报错
function user(prevState= initUser,action) {
    switch (action.type) {
        case  SAVE_USER:
            //1.先进行持久化存储
            setItem('user',action.data.user);
            setItem('token',action.data.token);
            return action.data
        case REMOVE_USER:
            removeItem('user')
            removeItem('token')
            return {
                user: {},
                token: ''
            }
        default :
            return prevState;
    }
}

function title(prevState = '', action) {
    switch (action.type) {
        case SET_TITLE :
            return action.data;
        default :
            return prevState;
    }
}

function categories(prevState = [], action) {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS :
            return action.data;
        case ADD_CATEGORY_SUCCESS:
            return [...prevState,action.data];
        default :
            return prevState;
    }
}




// 整合多个需要暴露的文件，调用combineReducers（），参数传对象，对象中可以写多个需要暴露的reducer
export default combineReducers({
    user,
    title,
    categories
})