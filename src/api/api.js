/*
对整个项目的api管理
 */
import request from './request.js'
export default {
    //水坝api
  getReservoirList(param){
      return request({
          url:'/reservoir/list',
          method:'get',
          data:param,
          mock:false
      })
  } ,
    deleteReservoir(param){
        return request({
            url:'/reservoir/delete/'+param.id,
            method:'delete',
            data:param,
            mock:false
        })
    } ,
    addReservoir(param){
        return request({
            url:'/reservoir/create',
            method:'post',
            data:param,
            mock:false
        })
    } ,
    updateReservoir(param){
        return request({
            url:'/reservoir/update',
            method:'put',
            data:param,
            mock:false
        })
    } ,
    findReservoir(param){
        return request({
            url:'/reservoir/find',
            method:'get',
            data:param,
            mock:false
        })
    } ,
    //河流api
    getStreamList(param){
        return request({
            url:'/stream/list',
            method:'get',
            data:param,
            mock:false
        })
    } ,
    deleteStream(param){
        return request({
            url:'/stream/delete/'+param.id,
            method:'delete',
            data:param,
            mock:false
        })
    } ,
    addStream(param){
        return request({
            url:'/stream/create',
            method:'post',
            data:param,
            mock:false
        })
    } ,
    updateStream(param){
        return request({
            url:'/stream/update',
            method:'put',
            data:param,
            mock:false
        })
    } ,
    findStream(param){
        return request({
            url:'/stream/find',
            method:'get',
            data:param,
            mock:false
        })
    } ,
    //河流流入关系api
    //河流api
    getStreamInflowList(param){
        return request({
            url:'/stream_inflow/list',
            method:'get',
            data:param,
            mock:false
        })
    } ,
    deleteStreamInflow(param){
        return request({
            url:'/stream_inflow/delete/'+param.id,
            method:'delete',
            data:param,
            mock:false
        })
    } ,
    addStreamInflow(param){
        return request({
            url:'/stream_inflow/create',
            method:'post',
            data:param,
            mock:false
        })
    } ,
    updateStreamInflow(param){
        return request({
            url:'/stream_inflow/update',
            method:'put',
            data:param,
            mock:false
        })
    } ,
    findStreamInflow(param){
        return request({
            url:'/stream_inflow/find',
            method:'get',
            data:param,
            mock:false
        })
    } ,
    //水坝图谱api
    getReservoirNodeList(param){
        return request({
            url:'reservoir/map/list',
            method:'get',
            data:param,
            mock:false
        })
    },
    //河流图谱api
    getStreamNodeList(param){
        return request({
            url:'stream/map/list',
            method:'get',
            data:param,
            mock:false
        })
    },
    //操作记录api
    getOperateRecordList(param){
        return request({
            url:'/operate_record/list',
            method:'get',
            data:param,
            mock:false
        })
    }

}