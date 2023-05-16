<template>
  <div class="reservoir-header">
    <el-button type="primary" class="reservoir-add" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入水坝名关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit1">搜索</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column fixed="right" label="操作" min-width="180" >
        <template #default="scope">
          <el-button  type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changePage"
        class="mt-4"
    />
  </div>

  <el-dialog
      v-model="dialogVisible"
      :title="action=='add'? '新增水坝':'编辑水坝'"
      width="50%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formReservoir" ref="reservoirForm" class="demo-form-inline">
      <el-form-item label="水坝名" prop="name" :rules="[{
        required:true,message:'水坝名是必填项'
      }]">
        <el-input v-model="formReservoir.name"  placeholder="请输入水坝名" />
      </el-form-item>

      <el-form-item label="最高水位" prop="maxWaterLevel" :rules="[
          {
            required: true,
            message: '水坝的最高水位是必填项',
            trigger: 'change'
      },
      {
      pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,8})?$/,
      message: '请输入小数,最多小数点后8位',
      trigger: 'change'
      }
      ]">
        <el-input v-model="formReservoir.maxWaterLevel"  placeholder="请输入最高水位" />
      </el-form-item>

      <el-form-item label="经度" prop="longitude" :rules="[
          {
            required: true,
            message: '水坝的经度是必填项',
            trigger: 'change'
      },
      {
      pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,8})?$/,
      message: '请输入小数,最多小数点后8位',
      trigger: 'change'
      }
      ]">
        <el-input v-model="formReservoir.longitude"  placeholder="请输入经度" />
      </el-form-item>

      <el-form-item label="纬度" prop="latitude" :rules="[
          {
            required: true,
            message: '水坝的纬度是必填项',
            trigger: 'change'
      },
      {
      pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,8})?$/,
      message: '请输入小数,最多小数点后8位',
      trigger: 'change'
      }
      ]">
        <el-input v-model="formReservoir.latitude"  placeholder="请输入纬度" />
      </el-form-item>

      <el-form-item  label="水坝高程" prop="elevation" :rules="[{
        required:true,message:'水坝高程是必填项'
      },{
        type:'number',
        message: '水坝高程必须是数字'
      }]">
        <el-input   v-model.number="formReservoir.elevation"  placeholder="请输入水坝高程" />
      </el-form-item>
      <el-row >
        <el-button   @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit2">确定</el-button>
      </el-row>

    </el-form>
  </el-dialog>
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
    const action=ref('add')
    //控制模态框的显示和隐藏
    const dialogVisible=ref(false)
    const  formInline=reactive({
      keyword:""
    })
    //新增用户表单
    const formReservoir=reactive({
      name:"",
      maxWaterLevel:'',
      createTime:'',
      longitude:'',
      latitude:'',
      elevation:'',
      updateTime:"",
    })
    let list=ref([])
    const config=reactive({
      total:0,
      page:1,
      name:''
    })
    const  tableLabel=[{
      prop:"name",
      label:"水坝名"
    },
      {
      prop:"maxWaterLevel",
      label:"最高水位(m)"
    },
      {
        prop:"longitude",
        label:"经度(°)"
      },
      {
        prop:"latitude",
        label:"纬度(°)"
      },{
        prop:"elevation",
        label:"高程(m)"
      },
      {
        prop:"createTime",
        label:"创建时间",
        width:180
      },
      {
        prop:"updateTime",
        label:"最后更新时间",
        width:180
      },
    ]
    //控制对话模态框
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭吗?')
          .then(() => {
            //关闭对话框
            proxy.$refs.reservoirForm.resetFields();
            done()
          })
          .catch(() => {
            // catch error
          })
    }
    // 控制关闭对话框
    const handleCancel=()=>{
      //关闭对话框
      dialogVisible.value=false
      proxy.$refs.reservoirForm.resetFields();
    }
    //获取水坝列表
    const  getReservoirData=async (param)=>{
      let res= await api.getReservoirList()
      list.value=res
    }
    //新增水坝
    const handleAdd=()=>{
      action.value='add'
      dialogVisible.value=true;
    }
    //编辑水坝
    const handleEdit=(row)=>{
      action.value='edit'
      console.log(row)
      Object.assign(formReservoir,row)
      dialogVisible.value=true;
    }
    //删除水坝
    const handleDelete= (row)=>{
      ElMessageBox.confirm('确定删除吗?')
          .then(async () => {
            await  api.deleteReservoir({
              id:row.id
            })
            ElMessage({
              showClose:true,
              message:"删除成功",
              type: 'success'
            })
            getReservoirData()
          })
          .catch(() => {
            // catch error
          })

    }
    const onSubmit1=async ()=>{
      console.log(formInline.keyword)
      let res= await api.findReservoir(formInline)
      list.value=res;
    }
    //用于编辑或者新增时表单的创建
    const  onSubmit2= ()=>{
      //需要先进行参数校验
      proxy.$refs.reservoirForm.validate(async (valid)=>{
            if(valid){
              if(action.value=='add'){
             //创建
                let res=await api.addReservoir(formReservoir);
              }
              else{
                //编辑接口)
                let res=await api.updateReservoir(formReservoir)
                // if(res){
                //   //关闭对话框
                //   dialogVisible.value=false
                //   proxy.$refs.formReservoir.resetFields();
                //   getReservoirData()
                // }

              }
              //关闭对话框
              dialogVisible.value=false
              proxy.$refs.reservoirForm.resetFields();
              ElMessage({
                showClose:true,
                message:"操作成功",
                type: 'success'
              })
              getReservoirData()
            }
            else{
              ElMessage({
                showClose:true,
                message:"请输入正确的内容",
                type: 'error'
              })

            }
          }
      )
    }
    onMounted(()=>{
      getReservoirData()
    })

    return{
      handleClose,
      handleAdd,
      handleCancel,
      handleEdit,
      handleDelete,
      onSubmit1,
      onSubmit2,
      action,
      tableLabel,
      list,
      config,
      formInline,
      dialogVisible,
      formReservoir
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