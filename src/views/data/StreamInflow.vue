<template>
  <div class="user-header">
    <el-button type="primary" class="user-add" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入河流名字关键字" />
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
          :width="item.width?item.width:180"
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
      :title="action=='add'? '新增河流流入关系':'编辑河流流入关系'"
      width="50%"
      :before-close="handleClose"
  >
    <el-form :inline="true" :model="formStreamInflow" ref="streamInflowForm" class="stream-from">
      <el-form-item  label="请输入流入起点名" prop="inflowStartName" :rules="[{
        required:true,message:'请输入流入起点名是必填项'
      }]">
        <el-select v-model="formStreamInflow.inflowStartName"
                   placeholder="请选择" >
          <el-option  v-for="item in selectList" :label=item.name :value=item.name></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="请输入流入终点名" prop="inflowEndName" :rules="[{
        required:true,message:'请输入流入终点名是必填项'
      }]">
        <el-select v-model="formStreamInflow.inflowEndName"
                   placeholder="请选择" >
          <el-option  v-for="item in selectList" :label=item.name :value=item.name></el-option>
        </el-select>
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
    //新增河流流入关系表单
    const formStreamInflow=reactive({
      inflowStartName:"",
      inflowEndName:"",
      createTime:'',
      updateTime:"",
    })
    let list=ref([])
    let selectList=ref([])
    const config=reactive({
      total:0,
      page:1,
      name:''
    })
    const  tableLabel=[{
      prop: "inflowStartName",
      label: "流入起点"
      },
      {
      prop: "inflowEndName",
      label: "流入终点"
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
            proxy.$refs.streamInflowForm.resetFields();
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
      proxy.$refs.streamInflowForm.resetFields();
    }
    //获取水坝列表
    const  getStreamInflowData=async (param)=>{
      let res= await api.getStreamInflowList()
      list.value=res
    }
    //新增水坝
    const handleAdd=async ()=>{
      action.value='add'
      dialogVisible.value=true;
      let res=await  api.getStreamList(
      )
      selectList.value=res
    }
    //编辑水坝
    const handleEdit=async (row)=>{
      action.value='edit'
      console.log(row)
      let res= await  api.getStreamList()
      selectList.value=res
      Object.assign(formStreamInflow,row)
      dialogVisible.value=true;
    }
    //删除水坝
    const handleDelete= (row)=>{
      ElMessageBox.confirm('确定删除吗?')
          .then(async () => {
            await  api.deleteStreamInflow({
              id:row.id
            })
            ElMessage({
              showClose:true,
              message:"删除成功",
              type: 'success'
            })
          getStreamInflowData()
          })
          .catch(() => {
            // catch error
          })

    }
    const onSubmit1=async ()=>{
      console.log(formInline.keyword)
      let res= await api.findStreamInflow(formInline)
      list.value=res;
    }
    //用于编辑或者新增时表单的创建
    const  onSubmit2= ()=>{
      //需要先进行参数校验
      proxy.$refs.streamInflowForm.validate(async (valid)=>{
            if(valid){
              if(action.value=='add'){
                //新增河流流入关系
                let res=await api.addStreamInflow(formStreamInflow);


              }
              else{
                //编辑接口)
                let res=await api.updateStreamInflow(formStreamInflow)
                // if(res){
                //   //关闭对话框
                //   dialogVisible.value=false
                //   proxy.$refs.formReservoir.resetFields();
                //   getReservoirData()
                // }

              }
              //关闭对话框
              dialogVisible.value=false
              proxy.$refs.streamInflowForm.resetFields();
              ElMessage({
                showClose:true,
                message:"操作成功",
                type: 'success'
              })
             getStreamInflowData()
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
      getStreamInflowData()
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
      formStreamInflow,
      selectList
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
</style>>