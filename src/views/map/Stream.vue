<template>
  <div class="map" >
    <div class="top">
    <el-card shadow="hover" v-show="curNode.name"   class="node-info">
      <div class="info">
        <p>
          河流名称: <span class="data">{{curNode.name}}</span>
        </p>
        <p>
          河流等级: <span class="data">{{curNode.level}}</span>
        </p>
        <p>
          河流类型: <span class="data">{{curNode.type}}</span>
        </p>
        <p>
          河流长度: <span class="data">{{curNode.length}}m</span>
        </p>
        <p>
          最后更新时间: <span class="time">{{curNode.lastUpdateTime}}</span>
        </p>
      </div>
    </el-card>
    </div>
    <div id="mynetwork" class="mynetwork" ref="mynetwork"></div>
  </div>

</template>

<script>
import vis from 'vis/dist/vis-network.min'
import api from '../../api/api.js'
import {onMounted, reactive, ref} from "vue";
export default {
  name: 'StreamMap',
  setup(){
    const mynetwork=ref(null)
    onMounted(()=>{
      console.log(mynetwork.value)
    })
    let nodeDataList=[]
    let relationDataList=[]
    let curNode=reactive({
      id:'',
      name:"",
      level:'',
      type:'',
      length:'',
      lastUpdateTime:''
    })
    // 创建节点数据数组
    let nodes = new vis.DataSet([
      // { id: 1, label: "Node 1" },
      // { id: 2, label: "Node 2" },
      // { id: 3, label: "Node 3" },
      // { id: 4, label: "Node 4" },
      // { id: 5, label: "Node 5" }
    ]);

    // 创建边数据数组
    let edges = new vis.DataSet([
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
    const  numReg = /^[0-9]*$/
    const  numRe = new RegExp(numReg)
    const isNumber=(s)=>{
      let res = numRe.test(s);
      return res
    }
   /* const  options= {
      autoResize: true, // 默认true,自动调整容器的大小
      height: '800px', // 默认值
      width: '1000px',  // 默认值
      locale: 'cn',   // 选择语言，默认英文en，cn为汉语
      // 配置模块
      configure: {
        enabled: false, // false时不会在界面上出现各种配置项
      },
      // 节点模块
      nodes: {
        chosen: true, // 对选择节点做出反应
        color: {
          border: '#2B7CE9',
          background: '#97C2FD',
          highlight: {
            border: '#2B7CE9',
            background: '#FFEC8B'
          },
          hover: {
            border: '#2B7CE9',
            background: '#FFFFFF'
          }
        },
        font: {
          align: 'left',
          color: '#FFC125',
          size: 12
          // vadjust: 10, // 标签文本的垂直位置，值越大离节点越远
        },
        shape: 'circle',
        size: 40, // 节点大小
        margin: 10,
        title: '哈哈哈', // 用户悬停在节点上时显示的标题,可以是HTML元素或包含纯文本或HTML的字符串
      },
      // 边模块
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow"
          },
          middle: {
            enabled: false,
            type: "image"
          },
          from: {
            enabled: false,
            type: "arrow"
          }
        },
        smooth: {
          enabled: true,
          type: 'dynamic', // 平滑曲线的类型
          forceDirection: 'horizontal' // 用于分层布局的配置项,可选值有: ['horizontal', 'vertical', 'none']
        },
      },
      // 交互模块
      interaction: {
        hover: true, // 启用鼠标悬停
        hoverConnectedEdges: false, // 鼠标悬停在节点上时，与其连接的边不高亮显示
        hideEdgesOnDrag: false, // true时拖动视图时不会绘制边。这会加快拖动时的响应速度
        hideNodesOnDrag: false, // true时拖动视图时不会绘制节点
        navigationButtons: true,
        selectConnectedEdges: false, // 选中节点时，与其连接的边不高亮
        multiselect: false, // true时长时间单击（或触摸）以及控件单击将添加到选择中
        tooltipDelay: 100,
      },
      //  布局
      layout: {
        randomSeed: 2000,
        hierarchical: {
          enabled: false,
          levelSeparation: 50, // 层级之间的距离,太小的话箭头会盖住标签字
          nodeSpacing: 50,     // 节点之间的距离
          treeSpacing: 50,     // 树之间的距离
          sortMethod: 'directed',
        },
      },
    }*/
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
          //mass: 2, // 节点之间的排斥力
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
      var network = new vis.Network(mynetwork.value, data, options);
      network.on("click", function (params) {
        let nodeId=params.nodes[0];
        if(isNumber(nodeId)){
          {
            let find=nodeDataList.find(item=> item.id==nodeId);
            Object.assign(curNode,find)
          }
        }else{
          curNode.name=''
        }
      });
    }
    const getReservoirData=async ()=>{
      let res= await api.getStreamNodeList()
      nodeDataList=res.streamNodeList
      relationDataList= res.relationList
      nodes=new vis.DataSet(res.streamNodeList.map((item)=>{
        item.label=item.name
        return item
      }))
      edges=new vis.DataSet(
          res.relationList.map((item)=>{
            item.from=item.startId
            item.to=item.endId
            item.label=item.relation
            return item
          })
      );
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
  height: 100%;
  width: 100%;
}
.top {
  width: 20%;
  height: 200px;
  .node-info {
    display: flex;
    flex-direction: column;
    .info {
      margin-top: 10px;
      font-size: 15px;
      line-height: 25px;
      color: #cccccc;
    }

    .time {
      margin-top: 10px;
      line-height: 20px;
      color: cornflowerblue;
    }
  }
}
.data {
    font-size: 15px;
    line-height: 30px;
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