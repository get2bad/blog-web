import axios from 'axios'
import { Notification } from 'element-ui'
export function QiNiuToken () {
    return axios.get('/wills/websettings/getToken')
}

export function error (notifyTitle, content) {
    Notification.error({
        title: notifyTitle,
        message: content
    })
}

export function success (notifyTitle, content) {
    Notification({
        title: notifyTitle,
        message: content,
        type: 'success'
    })
}

export function warning (notifyTitle, content) {
    Notification({
        title: notifyTitle,
        message: content,
        type: 'warning'
    })
}
