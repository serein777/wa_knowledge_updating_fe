<template>
  <div class="user-header">
    <el-button type="primary" class="user-add" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入河流名关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit1">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table" :span="18">
    <el-table :data="list" style="width: 100%" height="600px"  >
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width?item.width:165"
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
      :title="action=='add'? '新增河流':'编辑河流'"
      width="50%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formStream" ref="streamForm" class="stream-from">
      <el-form-item  label="河流名" prop="name" :rules="[{
        required:true,message:'河流名是必填项'
      }]">
        <el-input  class="stream-name"  v-model="formStream.name"  placeholder="请输入河流名" />
      </el-form-item>
      <el-form-item  label="河流等级" prop="level" :rules="[{
        required:true,message:'河流等级是必填项'
      }]">
        <el-select v-model="formStream.level" placeholder="请选择" >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="河流类型" prop="type" :rules="[{
        required:true,message:'河流类型是必填项'
      }]">
        <el-select v-model="formStream.type" placeholder="请选择" >
        <el-option label="大型河" value="大型河"></el-option>
        <el-option label="中型河" value="中型河"></el-option>
        <el-option label="小型河" value="小型河"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="河流长度" prop="length" :rules="[{
        required:true,message:'河流长度是必填项'
      },{
        type:'number',
        message: '河流长度必须是数字'
      }]">
        <el-input  class="stream-length" v-model.number="formStream.length"  placeholder="请输入河流长度" />
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
  name:'stream',
  setup(){
    const {proxy}=getCurrentInstance()
    const action=ref('add')
    //控制模态框的显示和隐藏
    const dialogVisible=ref(false)
    const  formInline=reactive({
      keyword:""
    })
    //新增用户表单
    const formStream=reactive({
      name:"",
      level:'',
      type:'',
      length:'',
      createTime:'',
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
      label:"河流名"
    },
      {
        prop:"level",
        label:"河流等级"
      },
      {
        prop:"type",
        label:"河流等级"
      },
      {
        prop:"length",
        label:"河流长度(单位m)"
      },
      {
        prop:"createTime",
        label:"创建时间"
      },
      {
        prop:"updateTime",
        label:"最后更新时间"
      },
    ]
    //控制对话模态框
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭吗?')
          .then(() => {
            //关闭对话框
            proxy.$refs.streamForm.resetFields();
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
      proxy.$refs.streamForm.resetFields();
    }
    //获取水坝列表
    const  getStreamData=async (param)=>{
      let res= await api.getStreamList()
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
      Object.assign(formStream,row)
      dialogVisible.value=true;
    }
    //删除水坝
    const handleDelete= (row)=>{
      ElMessageBox.confirm('确定删除吗?')
          .then(async () => {
            await  api.deleteStream({
              id:row.id
            })
            ElMessage({
              showClose:true,
              message:"删除成功",
              type: 'success'
            })
        getStreamData()
          })
          .catch(() => {
            // catch error
          })

    }
    const onSubmit1=async ()=>{
      console.log(formInline.keyword)
      let res= await api.findStream(formInline)
      list.value=res;
    }
    //用于编辑或者新增时表单的创建
    const  onSubmit2= ()=>{
      //需要先进行参数校验
      proxy.$refs.streamForm.validate(async (valid)=>{
            if(valid){
              if(action.value=='add'){
                //新增河流
                let res=await api.addStream(formStream);


              }
              else{
                //编辑接口)
                let res=await api.updateStream(formStream)
                // if(res){
                //   //关闭对话框
                //   dialogVisible.value=false
                //   proxy.$refs.formReservoir.resetFields();
                //   getReservoirData()
                // }

              }
              //关闭对话框
              dialogVisible.value=false
              proxy.$refs.streamForm.resetFields();
              ElMessage({
                showClose:true,
                message:"操作成功",
                type: 'success'
              })
              getStreamData()
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
      getStreamData()
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
      formStream
    }
  }
})
</script>

<style lang="less" scoped>
.user-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-row{
  display: flex;
  justify-content: flex-end;
}
.stream-from{
  display: flex;
  flex-direction: column;
}
.el-input{
  width: 200px;
}
.stream-name{
  margin-left: 14px;
}
</style>