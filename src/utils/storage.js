/*
* 封装localstorage的几个方法，
*       比如：默认使用 localstorage.getItem('test')方法读取的是字符串的形式，不能直接调用
*       一般我们存储的都是 对象或者数组，为了更好的使用，所以需要对这些方法进行简单的封装。
* */
function getItem(key) {
    const result = window.localStorage.getItem(key)
    return JSON.parse(result)  //将返回值解析成对象
}

function setItem(key,value) {
    window.localStorage.setItem(key,JSON.stringify(value)); // 将值转换成字符串再进行localstorage存储
}

function removeItem(key) {
    window.localStorage.removeItem(key)
}

export {
    getItem,
    setItem,
    removeItem
}