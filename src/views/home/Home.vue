<template>
  <div class="name">
    <h3 class="title">
      欢迎来到水利知识图谱自动化更新系统
    </h3>

  </div>


</template>

<script>
import {defineComponent, onMounted ,ref}  from "vue";
import axios from 'axios'
import  api from '../../api/api.js'
export default defineComponent({
  name:'home',
  setup(){

  }
})
</script>

<style lang="less" scoped>
.title{
  display: flex;
  justify-content: center;
  font-size: 30px;
  line-height: 50px;
  color: cornflowerblue;

}
</style>