import axios from 'axios'
import store from '@/store'
import API from '../api/index'

export default {
  install (Vue) {
    const fetch = options => {
      options = {
        loading: options.loading === undefined ? true : options.loading,
        globalError: options.globalError === undefined ? true : options.globalError, // 统一进行错误处理
        contentType: options.contentType || 'form', // application/x-www-form-urlencoded
        baseURL: options.baseURL === undefined ? process.env.BASE_API : options.baseURL,
        timeout: options.timeout || 20000,
        url: API[options.url] || options.url,
        method: options.method || 'post', // 调整为默认post请求
        headers: options.headers || {},
        params: options.params || {}, // get 方式参数,
        data: options.data || {}
      }
      // create an axios instance
      const service = axios.create({
        baseURL: options.baseURL, // api 的 base_url
        timeout: options.timeout // request timeout
      })
      // request interceptor
      service.interceptors.request.use(
        request => {
          // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
          request.headers['token'] = 'token'
          // 是否维护全局请求状态
          if (options.loading) {
            store.dispatch('app/setLoading', true)
          }
          return request
        },
        error => {
          // Do something with request error
          console.log(error) // for debug
          Promise.reject(error)
        }
      )
      // response interceptor
      service.interceptors.response.use(
        // response => response,
        /**
         * 下面的注释为通过在response里，自定义code来标示请求状态
         * 当code返回如下情况则说明权限有问题，登出并返回到登录页
         * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
         * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
         */
        response => {
          const res = response.data
          const code = Number(res.code)
          // 全局请求状态
          store.dispatch('app/setLoading', false)
          if (res.code && code !== 200) {
            // 统一错误处理
            switch (res.code) {
              // 不进行统一处理错误提示信息的code
              case 10001:
                return Promise.reject(res)
              default:
                // API接口错误提示信息统一处理，前期把报错的API地址一同暴露给用户，便于开发人员排查问题
                alert(JSON.stringify(res))
            }
            return Promise.reject(res)
          } else {
            // 成功
            return Promise.resolve(res)
          }
        },
        err => {
          // 全局请求状态
          store.dispatch('app/setLoading', false)
          console.log('request---> ', err.request) // for debug
          console.log('response---> ', err.response) // for debug

          // 401
          if (err.response && err.response.status === 401) {
            // 没有请求接口权限处理
            return Promise.reject(err)
          } else {
            let msg = [err.message]
            if (err.response && err.response.data) {
              // API response 返回非200情况下的处理逻辑
              msg = [err.response.data.message, err.response.data.path]
            } else if (err.request && err.request.timeout) {
              msg = ['网络繁忙，请稍后再试！']
            }
            console.log({
              message: msg.join(' - '),
              type: 'error',
              duration: 5 * 1000
            })
            return Promise.reject(err)
          }
        }
      )
      return service(options)
    }
    Vue.prototype.$fetch = fetch
  }
}
