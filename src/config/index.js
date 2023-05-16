/**
 * 三个环境
 * 本地
 * 测试
 * 线上
 */
//获取当前环境
const  env=import.meta.env.MODE||'prod'
const EnvConfig={
    development:{
        baseApi: 'http://127.0.0.1:8080',
        mockApi:'https://www.fastmock.site/mock/df1e4a0f336038f2d6e7f9b60beece69/api'
    },
    test:{
        baseApi:'//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/df1e4a0f336038f2d6e7f9b60beece69/api'
    },
    pro:{
        baseApi:'//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/df1e4a0f336038f2d6e7f9b60beece69/api'
    }
}
export default {
    env,
    mock:true,
   ...EnvConfig[env]
}