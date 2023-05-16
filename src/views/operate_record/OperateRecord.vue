<template>
  <div class="reservoir-header">
    <!--
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit1">搜索</el-button>
      </el-form-item>
    </el-form>  -->
  </div>

  <div class="table" :span="18">
    <el-table :data="list" style="width: 100%" height="600px"   >
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width?item.width:120"
      >
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {defineComponent, getCurrentInstance} from "vue";
import api from '../../api/api.js'
import {onMounted} from "vue";
import {ref} from "vue";
import {reactive} from "vue";
export default defineComponent({
  name:'reservoir',
  setup(){
    const {proxy}=getCurrentInstance()
    const  formInline=reactive({
      keyword:""
    })
    let list=ref([])
    const config=reactive({
      total:0,
      page:1,
      name:''
    })
    const  tableLabel=[{
      prop:"dataType",
      label:"数据类型"
    },
      {
      prop:"operateType",
      label:"操作类型"
    },
      {
        prop:"operateDetail",
        label:"操作详情",
        width:500
      },
      {
        prop:"operateTime",
        label:"操作时间",
        width: 200
      }
    ]
    //获取操作记录列表
    const  getReservoirData=async (param)=>{
      let res= await api.getOperateRecordList()
      list.value=res
    }
    const onSubmit1=async ()=>{
      console.log(formInline.keyword)
      let res= await api.findReservoir(formInline)
      list.value=res;
    }
    onMounted(()=>{
      getReservoirData()
    })

    return{
      onSubmit1,
      tableLabel,
      list,
      config,
      formInline,
    }
  }
})
</script>

<style lang="less" scoped>
.reservoir-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-row{
  display: flex;
  justify-content:space-between ;
}

</style>