<template>
<el-header>
  <div class="l-content" >
    <!-- 使用 el-icon 为 SVG 图标提供属性 -->
      <div>
        <el-button size="small" @click="handleCollapse()" >
          <el-icon :size="20" >
            <Menu />
          </el-icon>
        </el-button>
        <!--面包屑-->
      </div>
      <el-breadcrumb separator="/" class="bread">
        <!--首页是home  写死-->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
     </div>

    <div class="r-content">
       <img class="logo" :src="getImgSrc()" >
      <el-icon class="el-icon--right">
      </el-icon>
    <h1 class="title" style="font-size: 20px ">
      水利知识图谱自动更新系统
    </h1>

  </div>
</el-header>

</template>

<script>
import {Menu} from "@element-plus/icons-vue";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "CommonHeader",
  components: {Menu, },
  setup(){
    const store=useStore()
  //  const imgSrc=require("../assets/img/hhu_logo.png")
   const getImgSrc= ()=>{
      return new URL("../assets/img/hhu_logo.png",import.meta.url).href
    };
   let handleCollapse=()=>{
      store.commit('updateIsCollapse')
   };
   const  current=computed(()=>{
     return store.state.currentMenu;
   });
    return{
     getImgSrc,
      handleCollapse,
      store,
      current
    }
  }
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  justify-content: space-between;
  height: 100px;
  width: 100%;
  background: #3c8dbc;
}
.r-content {
  margin-right: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{

  }
.bread{
  /deep/ span{
    color: #b8c7ce;
    cursor: pointer;
  }
}
.title{
  font-size: 100px;
  height: 60px;
}
}

</style>