import axios from 'axios'
import * as common from './common.js'
export function post (url, val) {
    return axios.post(url, val)
}

export function putItem (url, val) {
    return axios.put(url, val)
}

export function deleteItem (url) {
    axios.delete(url).then((res) => {
        if (res.data.statusCode === 200) {
            common.success('提示', '删除成功！')
        } else {
            common.warning('提示', '删除失败！服务器内部错误，请您联系管理员')
        }
    })
}

export function deleteItemPromise (url) {
    return axios.delete(url)
}

export function getItem (url) {
    return axios.get(url)
}

export function postItem (url, val) {
    return axios.post(url, val)
}

export function message (res, showMessage, func) {
    if (res.data.statusCode === 200) {
        if (showMessage) {
            common.success('提示', showMessage)
        }
        if (func) {
            func()
        }
        if (res.data.data) {
            return res.data.data
        } else {
            return true
        }
    } else {
        common.warning('提示', '操作失败！服务器内部错误，请您联系管理员')
    }
}
