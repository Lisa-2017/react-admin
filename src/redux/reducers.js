/*
    根据之前的 prevState 和 action 来生成 newState
*/

import  { combineReducers } from  'redux'



// reducer函数必须设置默认状态值，不写默认为undefined,会报错
function xxx(prevState={},action) {
    switch (action.type) {

        default :
            return prevState;
    }
}

// 整合多个需要暴露的文件，调用combineReducers（），参数传对象，对象中可以写多个需要暴露的reducer
export default combineReducers({
    xxx
})