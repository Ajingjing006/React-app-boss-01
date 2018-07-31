/**
 * 发送任意ajax的请求模块,
 * 函数的返回值是promise对象，可以使用async 和await去拿值
 * */
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
    if (type === 'GET') {
        let paramStr = ''
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                paramStr += `${i}=${data[i]}&`
            }
        }

        if (paramStr) {
            paramStr = paramStr.substring(0, paramStr.length - 1);
        }
        return axios.get(`${url}?${paramStr}`)
    }
    else {
        return axios.post(url, data)
    }
}

