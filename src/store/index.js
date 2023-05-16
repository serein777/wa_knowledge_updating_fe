import  {createStore} from "vuex";
export default createStore({
    state: {
        isCollapse:true,
        currentMenu:null,
        tableList:[
            {
                path:"/",
                name:"home",
                label:"首页",
                icon:"home",
            },
        ]
    },
    mutations:{
        updateIsCollapse(state,payload){
          state.isCollapse=!state.isCollapse
        },
        selectMenu(state,val){
         val.name=='home'?(state.currentMenu=null):(state.currentMenu=val)
            if(val.name=='home') {
                state.currentMenu = null
            }
            else {
                state.currentMenu=val;
                let result=state.tableList.findIndex(item=>item.name===val.name)
                result==-1? state.tableList.push(val):''
            }
        },
        closeTag(state,val){
           let res=  state.tableList.findIndex(item=>item.name==val.name)
            state.tableList.splice(res,1)
        }

}

}
)