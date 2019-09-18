/*
   包含n个 生产action对象工厂函数 模块
*/

import {
    SAVE_USER,
    REMOVE_USER,
    SET_TITLE,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    GET_ROLES_SSUCCESS
} from './action-types'
import { reqGetCategories,reqAddCategory,reqUpdateCategory,reqDeleteCategory,reqGetRoles } from '@api';


// 保存用户数据
export  const saveUser = (user)=>({type:SAVE_USER,data:user})
// 退出，清除redux
export  const removeUser = ()=>({type:REMOVE_USER})

// 设置title
export const setTitle = (title) => ({type: SET_TITLE, data: title});


/* 获取分类数据----同步action creators*/
const getCategoriesSuccess =(categories)=>({
    type: GET_CATEGORIES_SUCCESS,
    data:categories
})
/* 获取分类数据----异步action creators*/
export  const getCategories=()=>{
    return async (dispatch)=>{
        const  result = await  reqGetCategories(); // 发送请求，请求分类列表的数据
        dispatch(getCategoriesSuccess(result)) // 更新redux状态
    }
}

/* 添加分类数据 ----同步action */
const  addCategorySuccess =(category) => ({
    type: ADD_CATEGORY_SUCCESS,
    data: category
});
/* 添加分类数据 ----异步action */
export  const  addCategory = (categoryName)=>{
    return async (dispatch) =>{
        const  result = await  reqAddCategory(categoryName)
        dispatch(addCategorySuccess(result))
    }
}

/* 修改分类数据 ----同步action */
const updateCategorySuccess = (category) => ({type: UPDATE_CATEGORY_SUCCESS, data: category});
/* 修改分类数据 ----异步action */
export const updateCategory = (categoryId, categoryName) => {
    return async (dispatch) => {
        const result = await reqUpdateCategory(categoryId, categoryName);
        dispatch(updateCategorySuccess(result));
    }
};

/* 删除分类数据 ----同步action */
const deleteCategorySuccess = (category) => ({type: DELETE_CATEGORY_SUCCESS, data: category});
/* 删除分类数据 ----异步action */
export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        const result = await reqDeleteCategory(categoryId);
        dispatch(deleteCategorySuccess(result));
    }
};

/* 获取权限数据 ----同步action */
const getRolesSuccess = (roles)=>({type:GET_ROLES_SSUCCESS,data:roles})
/* 获取权限数据 ----异步action */
export  const  getRoles = ()=>{
    return async (dispatch)=>{
        const  result = await reqGetRoles();
        dispatch(getRolesSuccess(result));
    }
}

