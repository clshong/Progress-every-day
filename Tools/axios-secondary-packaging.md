## Software Installation

`npm i axios -D && yarn add axios`

## vue2 wrapper

#### 创建文件utils，创建一个request.js文件

```
import axios from "axios";

const instance = axios.create({
  //设置请求服务器地址 
  baseURL:'地址',
  //5s自动结束
  timeout:'5000' //时间
})

// 请求拦截
//所有的网络请求都会走这个方法
instance.interceptors.request.use(
  (config)=>{
    console.group("全局请求拦截")
    console.log(config)
    console.groupEnd()
    //设置token
    // config.headers.token = "demo"  //demo根据成自己的需求定义
    return config
  },(config)=>{
    return Promise.reject(config)
  }
)
//响应拦截
// 所有数据返回数据之后都会执行此方法
//此处可以根据服务器的返回状态码做相应的数据
//404 401 500,
instance.interceptors.response.use(
  (response) =>{
    console.group("全局响应拦截")
    console.log(response.data)
    console.groupEnd()
    return response.data
  },(response) =>{
    return Promise.reject(response)
  }
)

// get方法
export function get(url,params){
  return instance.get(url,{
    params
  }
    )
}
//post方法
export function post(url,params,data){
  return instance.post(url,data,{params})
}
//del方法
export function del(url){
  return instance.delete(url)
}

export default instance;
```

#### main.js中引入

```// 导入 request中所有模块
import * as request from './utils/request.js'
for(let key in request){
	Vue.prototype[key] = request[key]
}
```

使用方法：

方法一：通过main.js全局

```
ansyc created(){
  let res = await this.get('/banner')
   console.log(res);
  }
```

方法二：在utils创建一个api.js统一化管理

```
 import request from '@/utils/request.js'

//模块封装 页面中直接使用方法
export const getBanner = (data) => request.get('/banner',data)
```

```
async created(){
   // 获取bnner
   let res = await getBanner()
   console.log(res);
}
```

## Vue3 wrapper

创建文件utils，创建一个request.js文件夹包含config.ts、index.ts、type.ts；例外在utils主文件中创一个index.ts文件

- request

  - config.ts

    ```
    // 根据process.env.NODE_ENV区分
    // 开发环境:development
    // 生产环境:production
    // 测试环境:test
    let BASE_URL = ''
    const TIME_OUT = 5000
    
    if (process.env.NODE_ENV === 'development') {
      BASE_URL = '#'
    } else if (process.env.NODE_ENV === 'production') {
      BASE_URL = '#'
    } else {
      BASE_URL = '#'
    }
    
    export { BASE_URL, TIME_OUT }
    ```

  - type.ts

    ```
    import type { AxiosRequestConfig, AxiosResponse } from 'axios'
    
    export interface CHRequestInterceptors {
      requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
      requestInterceptorCatch?: (error: any) => any
      responseInterceptor?: (res: AxiosResponse) => AxiosResponse
      responseInterceptorCatch?: (error: any) => any
    }
    
    export interface CHRequestConfig extends AxiosRequestConfig {
      interceptors?: CHRequestInterceptors
    }
    ```

  - index.ts

    ```
    import axios from 'axios'
    import type { AxiosInstance } from 'axios'
    import { CHRequestConfig, CHRequestInterceptors } from './type'
    class CHRequest {
      instance: AxiosInstance
      interceptors?: CHRequestInterceptors
      constructor(config: CHRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors
        this.instance.interceptors.request.use(
          this.interceptors?.requestInterceptor,
          this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
          this.interceptors?.responseInterceptor,
          this.interceptors?.responseInterceptorCatch
        )
        // 添加所有实例都有的拦截器
    
        this.instance.interceptors.request.use(
          (config) => {
            return config
          },
          (err) => {
            return err
          }
        )
    
        this.instance.interceptors.response.use(
          (config) => {
            return config
          },
          (err) => {
            return err
          }
        )
      }
      request(config: CHRequestConfig): void {
        if (config.interceptors?.requestInterceptor) {
          config = config.interceptors.requestInterceptor(config)
        }
        this.instance.request(config).then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res.data)
        })
      }
    }
    export default CHRequest
    
    ```

    

- index.ts

  ```
  import CHRequest from './request'
  import { BASE_URL, TIME_OUT } from './request/config'
  
  const chRequest = new CHRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求成功的拦截')
        return config
      },
      requestInterceptorCatch: (err) => {
        console.log('请求失败的拦截')
        return err
      },
      responseInterceptor: (res) => {
        console.log('响应成功的拦截')
        return res
      },
      responseInterceptorCatch: (err) => {
        console.log('响应失败的拦截')
        return err
      }
    }
  })
  export default chRequest
  
  ```

  