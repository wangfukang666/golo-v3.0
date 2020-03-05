import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '../router'
import {is_production, proxy_handle} from '../common/config'
import {Toast } from 'vant'

export const OK = 0

axios.defaults.timeout = 10000

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Access-Control-Allow-Origin': '*'
}

// 通用参数
const params = {}

const api = axios.create({
  baseURL: '/',
  params,
  headers
})

// 响应拦截
api.interceptors.response.use(
  (response) => {
    const res = response.data
    const url : string | undefined = response.config.url
    if (url == '/api/Inter/queryDevice' || url == '/apis/api/Inter/queryDevice') {
      if (res.code == 1) {
        // return res.data
        const no = res.data
        let menu_types: any =  []
        if(no && no.devicesn == '989846001001') menu_types = ['现场培训', '现场维修']
        if(no && no.devicesn == '624590081900') menu_types = ['现场维修', '客户索赔']
        return Object.assign(no || {}, {menu_types})
      } else { 
        Toast(res.msg || '获取数据失败，请刷新重试')  
        return null
      }
    }
    if (res.code != OK) {  
      Toast(res.msg || '获取数据失败，请刷新重试') 
      return null
    }  
    return res.data
  },
  err => {
    try {
      const err_code =  err.response.status
      switch (err_code) {
        case 401 :
          // 登录过期 ,2秒后跳转
          Toast('登录失效')
          localStorage.removeItem('userInfo')
          setTimeout(() => {
            router.push('/login')
          },2000)     
        break; 
        case 500 :
          Toast('服务器访问失败,请刷新后重试')
        break; 
      }
    } catch (err) {
      Toast('服务器响应超时,请重试')
    }
  }
)

// 请求拦截
api.interceptors.request.use(
  function (config) {
    if (is_production) config.url = proxy_handle(config.url)  
    // 注入token
    let t: any = store.state
    const headers_pro = config.headers['Content-Type'] == 'application/x-www-form-urlencoded'
    config.params.token = t.token  
    if(config.method == 'post' && headers_pro) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    Toast('服务器响应超时')
    return Promise.reject(err)
  }
)

export default api
