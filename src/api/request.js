import axios from 'axios'
import config from "../config/index.js";
import {ElMessage} from "element-plus";



const NETWORK_ERROR='网络请求异常,请稍后重试'
//创建一个axios实例对象
    const  service = axios.create(
        {
            baseURL: config.baseApi
        })
    service.interceptors.request.use((req) => {
            //请求前做一些事情
            return req;
        }
    )
    service.interceptors.response.use((response) => {
        const {code, obj, message} = response.data
        if (code == 200) {
                return obj
            } else {
                //网络请求错误
          console.log(message)
                ElMessage.error(message || NETWORK_ERROR)
                return Promise.reject(message || NETWORK_ERROR)
            }
        }
    )
//封装核心对象
    function request(options)
{
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }
    let isMock = config.mock
    if (typeof options.mock != "undefined") {
        isMock = options.mock
    }
    if (config.env == 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }
    return service(options)
}
export default request
