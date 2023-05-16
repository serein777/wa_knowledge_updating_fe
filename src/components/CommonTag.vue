<template>
  <div class="tags" >
    <el-tag v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name!='home'"
    :disable-transitions="false"
    :effect="$route.name==tag.name?'dark':'plain'"
    @click="changeMenu(tag)"
    @close="handleClose(tag,index)">
      {{tag.label}}
    </el-tag>
  </div>

</template>



<script>
import { useStore } from "vuex"
import {useRoute, useRouter} from "vue-router"
export default {
  name: "CommonTag",
  setup(){
    const store=useStore()
    const  tags=store.state.tableList;
    const router=useRouter()
    const route=useRoute()
    const changeMenu=(item)=>{
      router.push({name:item.name})
    }
    const handleClose=(tag,index)=>{
      let  length=tags.length-1;
      store.commit('closeTag',tag)
      if(tag.name!=route.name){
        return
      }
      if(index==length){
        router.push({
          name:tags[index-1].name
        })
      }
      else {
        router.push({
          name:tags[index].name
        })
      }

    }
    return{
      store,
      tags,
      changeMenu,
      handleClose
    }
  }
}
</script>

<style lang="less" scoped>
.tags{
  padding: 20px;
  width: 100%;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>