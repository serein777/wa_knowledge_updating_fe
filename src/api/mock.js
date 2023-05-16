import Mock from 'mockjs'
import homeApi from "./mock/mockData/home.js"
import userApi from "./mock/mockData/user.js"
import config from "../config/index.js";

Mock.mock('/home/getData',homeApi.getHomeData())
Mock.mock('/user/getUser','get',userApi.getUserList)
Mock.mock('/user/add','post',userApi.createUser)
Mock.mock('/user/update','update',userApi.updateUser)
Mock.mock('/user/delete','delete',userApi.deleteUser)

