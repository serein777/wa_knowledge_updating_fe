<template>
  <div class="map">
    <div class="top">
  <el-card v-show="curNode.name"  shadow="hover" class="node-info">
    <div  class="info">
    <p>
       水坝名称: <span class="data">{{curNode.name}}</span>
    </p>
    <p>
      最高水位: <span class="data">{{curNode.maxWaterLevel}}m</span>
    </p>
      <p>
        经度: <span class="data">{{curNode.longitude}}°</span>
      </p>
      <p>
        纬度: <span class="data">{{curNode.latitude}}°</span>
      </p>
      <p>
        高程: <span class="time">{{curNode.elevation}}m</span>
      </p>
      <p>
        最后更新时间: <br><span class="time">{{curNode.lastUpdateTime}}</span>
      </p>
    </div>
  </el-card>
    </div>
  <div id="mynetwork" ref="mynetwork"></div>
  </div>
</template>

<script>
import vis from 'vis/dist/vis-network.min'
import api from '../../api/api.js'
import {onMounted, reactive, ref} from "vue";
export default {
  name: 'ReservoirMap',
  setup(){
    const mynetwork=ref(null)
    let  curNode=reactive({
      id:'',
      name:"",
      maxWaterLevel:'',
      longitude:'',
      latitude:'',
      elevation:'',
      lastUpdateTime:''
    })
    const  numReg = /^[0-9]*$/
    const  numRe = new RegExp(numReg)
    const isNumber=(s)=>{
      let res = numRe.test(s);
      return res
    }
    let nodeDataList=[]
    // 创建节点数据数组
    let nodes = new vis.DataSet([
      // { id: 1, label: "Node 1" },
      // { id: 2, label: "Node 2" },
      // { id: 3, label: "Node 3" },
      // { id: 4, label: "Node 4" },
      // { id: 5, label: "Node 5" }
    ]);
    let network={}
    // 创建边数据数组
    const edges = new vis.DataSet([
      /*{ from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }*/
    ]);
    // 将数据赋值给vis 数据格式化器
    var data = {
      nodes: nodes,
      edges: edges
    };

    const options={
      autoResize: true, // 自动调整容器大小（无css下起作用）
      nodes: { // 节点
        borderWidth: 1, // 节点边框的宽度
        borderWidthSelected: 2, // 选中节点的边框宽度,未定义时为borderwidth*2
        chosen: { // 对选择及悬停做出反应
          node: function(values, id, selected, hovering) {
            values.color = 'green'
          },
        },
        color: {
          background: '#FFA500'
        },
        fixed: false, //节点不可以移动
        font: {
          color: '#fff',
          size: 12,
          align: 'center',
        },
      //  mass: 1, // 节点之间的排斥力
        shadow: {
          enabled: true, // 阴影
        },
        shape: 'circle', // 节点的外观
        margin: 10
      },
      edges: { // 边的配置项必须包含在名为“edges”的对象中
        smooth: {
          enabled: true,
          type: "continuous",
          roundness: 0.8
        },
        arrows: { // 线条
          to: {
            enabled: true, // 打开或关闭箭头
            type: 'arrow', //箭头类型
          }
        },
        color: '#379857',
        font: {
          color: '#2B4DEF',
        },
        chosen: { // 对选择及悬停做出反应
          edge: function(values, id, selected, hovering) { // 线的变化
            values.color = 'green';
            values.width = 2
          },
          label: function(values, id, selected, hovering) { // 线上标签的变化
            values.color = 'green'
          },
        },
      },
      layout: {
        randomSeed: 1, //配置每次生成的节点位置都一样
      },
    }

    const  makeVis=()=>{
      // 初始化关系图
       network = new vis.Network(mynetwork.value, data, options);
       network.on("click", function (params) {
        let nodeId=params.nodes[0];
        if(isNumber(nodeId)){
          {
            let find=nodeDataList.find(item=> item.id==nodeId);
            curNode.name=find.name;
             curNode.id=find.id;
            curNode.maxWaterLevel=find.maxWaterLevel;
            curNode.longitude=find.longitude;
            curNode.latitude=find.latitude;
            curNode.elevation=find.elevation;
            curNode.lastUpdateTime=find.lastUpdateTime;
          }
        }else{
          curNode.name=''
        }
      });
    }
    const getReservoirData=async ()=>{
      let res= await api.getReservoirNodeList()
      nodeDataList=res
      nodes=new vis.DataSet(res.map((item)=>{
        item.label=item.name
        return item
      }))
      data={
        nodes: nodes,
        edges: edges
      }
      console.log(data)
      makeVis()
    }

    onMounted(()=>{
      console.log(mynetwork)
      getReservoirData()
    })
    return{
      mynetwork,
      curNode
    }
  }
}
</script>
<style lang="less">
.map {
  display: flex;
  flex-direction: column;
}
.top {
  width: 20%;
  height: 200px;
  .node-info {
    display: flex;
    flex-direction: column;
    align-items: start;
    .info {
      margin-top: 10px;
      font-size: 15px;
      line-height: 20px;
      color: #cccccc;
    }

    .time {
      margin-top: 15px;
      line-height: 20px;
      color: cornflowerblue;
    }
  }
}
.data{
  font-size: 15px;
  line-height: 20px;
  color: cornflowerblue;
}
#mynetwork {
  width: 100%;
  height: 500px;
  border: 1px solid lightgray;
}
.visBox{
  width: 500px;
  height: 500px;
  position: relative;
}
.visTitle {
  position: absolute;
  top: 0;
  left: 0;
  background-color: antiquewhite;
  width: 230px;
  height: 50px;
  line-height: 50px;
}
</style>