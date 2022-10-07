import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create()
axios.defaults.baseURL = ''
axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = ''

    if (token) {
      config.headers!.Authorization = 'Bearer ' + token
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },

  (error) => {
    if (error.response.status) {
      let errMessage = '未知错误'
      switch (error.response.status) {
        case 400:
          errMessage = '错误的请求'
          break
        case 401:
          errMessage = '未授权，请重新登录'
          break
        case 403:
          errMessage = '拒绝访问'
          break
        case 404:
          errMessage = '请求错误,未找到该资源'
          break
        case 405:
          errMessage = '请求方法未允许'
          break
        case 408:
          errMessage = '请求超时'
          break
        case 500:
          errMessage = '服务器端出错'
          break
        case 501:
          errMessage = '网络未实现'
          break
        case 502:
          errMessage = '网络错误'
          break
        case 503:
          errMessage = '服务不可用'
          break
        case 504:
          errMessage = '网络超时'
          break
        case 505:
          errMessage = 'http版本不支持该请求'
          break
        default:
          errMessage = `其他连接错误 --${error.response.status}`
      }

      return Promise.reject(error.response)
    }
  }
)

export default instance
