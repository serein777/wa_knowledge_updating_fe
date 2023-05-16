<template>
    <div class="common-layout">
      <el-container class="lay-container">
       <common-aside></common-aside>

        <el-container class="r-container">
          <common-header/>
          <common-tag></common-tag>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>

      </el-container>
    </div>
  </template>


<script>
import {defineComponent} from "vue";
import commonHeader from "../components/CommonHeader.vue";
import commonAside from "../components/CommonAside.vue";
import commonTag from "../components/CommonTag.vue";


export  default  defineComponent({
 components:{
   commonHeader,
   commonAside,
   commonTag
 }

})
</script>

<style lang="less" scoped>
.common-layout{
  height: 100%;
  &> .el-container{
    height: 100%;
    &> .el-aside{
      height: 100%;
      background: #222d32;
    }
  }
}
.r-container{
  display: flex;
  flex-direction: column;
}
.el-main{
  padding: 0;
}
</style>