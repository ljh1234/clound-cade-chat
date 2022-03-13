import Axios from 'axios'
import store from '@/store/index'
import { message } from 'ant-design-vue'

const defaultOption = {
  baseURL: '/api',
  timeout: 3 * 60 * 1000
}

class http {
  constructor(options) {
    this.instance = Axios.create(options)
  
    this.instance.interceptors.request.use(config => {
      if (store.getters.token) {
        config.headers['Authorization'] = store.getters.token
      }

      return config
    })

    this.instance.interceptors.response.use(response => {
      console.log('response', response)
      if (response.status !== 200 && response.status !== 201) {
        message.error({ content: '请求错误' })

        return null
      }

      const { data } = response
      if (data.code !== 0) {
        message.error({ content: data.msg })
        return null
      }

      return data.data

    })
  }

  post(...rest) {
    return this.instance.post(...rest)
  }

  get(...rest) {
    return this.instance.get(...rest)
  }
}

export default new http(defaultOption)