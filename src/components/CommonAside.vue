<template>
  <el-aside :width="$store.state.isCollapse? '180px' : '64px'">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#1e282c"
            text-color="#b8c7ce"
            active-text-color="#409eff"
            :collapse="!$store.state.isCollapse"
            :collapse-transition="false"
        >
          <h3 v-show= " $store.state.isCollapse">后台管理</h3>
          <h3 v-show= " !$store.state.isCollapse">后台</h3>

          <el-sub-menu
              v-for="item in hasChildren()"
              :index="item.label"
              :key="item.path">
            <template #title>
              <component class="icon" :is="item.icon"></component>
              <span>{{item.label}}</span>
            </template>
            <el-menu-item-group>
               <el-menu-item
                   v-for="(subItem,subIndex) in item.children"
                    :index="subItem.path"
                    :key="subIndex"
                    @click="clickMenu(subItem)"
               >
                 <component class="icon" :is="subItem.icon"></component>
                 <span>{{subItem.label}}</span>
               </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item  v-for="item in noChildren()"
                         :key="item.path"
                         :index="item.path"
                         @click="clickMenu(item)">
            <component class="icon" :is="item.icon"></component>
            <span>{{item.label}}</span>
          </el-menu-item>
        </el-menu>
  </el-aside>
</template>

<script>
import { useStore } from "vuex"
import {useRouter} from "vue-router"
export default {

  name: "CommonAside",
  setup(){
    const router=useRouter();
    const store=useStore();
    const list=[
      {
        path:"/map",
        name:"map",
        label:"图谱管理",
        url:"map",
        icon:"setting",
        children:[
          {
            path:"/map/reservoir",
            name:"mapReservoir",
            label:"水坝图谱管理",
            icon:"setting",
            url:"mapReservoir",
          },
          {
            path:"/map/Stream",
            name:"mapStream",
            label:"河流图谱管理",
            icon:"setting",
            url:"mapStream",
          }
        ]
      },
      {
        path:"/data",
        name:"data",
        label:"数据底板管理",
        icon:"List",
        url:"Data",
        children:[
          {
            path:"/data/reservoir",
            name:"dataReservoir",
            label:"水坝数据",
            icon:"MilkTea",
            url:"Reservoir",
          },
          {
            path:"/data/stream",
            name:"dataStream",
            label:"河流数据",
            icon:"Key",
            url:"Stream",
          },
          {
            path:"/data/stream_inflow",
            name:"dataStreamInflow",
            label:"河流流入关系",
            icon:"MilkTea",
            url:"StreamInflow",
          }
        ]
      },
      {
        path:"/operate_record",
        name:"OperateRecord",
        label:"操作记录",
        icon:"List",
        url:"OperateRecord",
      }
    ];
    const noChildren=()=>{
      return list.filter((item)=>!item.children)
    }
    const hasChildren=()=>{
      return list.filter((item)=>item.children)
    }
    const clickMenu = (item) => {
      router.push({
        name:item.name
      })

     store.commit('selectMenu',item)
    }
    return{
      list,
      noChildren,
      hasChildren,
      clickMenu,

    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  border-right: none;
}
.el-aside{
  display: flex;
  flex-direction: column;
}
.icon{
  height: 18px;
  width: 18px;
  color: #FFFFFF;
  margin-right: 10px
}
h3{
  color: #1196EE;
  line-height: 60px;
text-align: center;
}
</style>