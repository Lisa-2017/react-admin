import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import  { composeWithDevTools } from 'redux-devtools-extension'
import  reducers from './reducers'



let store;
if( process.env.NODE_ENV === 'development' ){
    store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));  // 开发环境
}else{
    store = createStore(reducers,applyMiddleware(thunk));  // 生产环境
}
export  default store;
