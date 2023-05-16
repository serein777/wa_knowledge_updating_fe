import {createRouter,createWebHashHistory} from "vue-router";
const routes=[{
    path:'/',
    title:"水利知识图谱自动化更新系统",
    component:()=>import("../views/Main.vue"),
    children:[{
        path:'/',
        name:'home',
        component:()=>import("../views/home/Home.vue")
    },
        {
            path: '/user',
            name: 'user',
            component:()=>import("../views/user/User.vue")
        },
        {
        path: '/data/reservoir',
        name: 'dataReservoir',
        component:()=>import("../views/data/Reservoir.vue")
        },
        {
            path: '/data/stream',
            name: 'dataStream',
            component:()=>import("../views/data/Stream.vue")
        },
        {
            path: '/data/stream_inflow',
            name: 'dataStreamInflow',
            component:()=>import("../views/data/StreamInflow.vue")
        },
        {
            path: '/data/stream_inflow',
            name: 'dataStreamInflow',
            component:()=>import("../views/data/StreamInflow.vue")
        },
        {
            path: '/map/reservoir',
            name: 'mapReservoir',
            component:()=>import("../views/map/Reservoir.vue")
        },
        {
            path: '/map/stream',
            name: 'mapStream',
            component:()=>import("../views/map/Stream.vue")
        },
        {
            path: '/operate_record',
            name: 'OperateRecord',
            component:()=>import("../views/operate_record/OperateRecord.vue")
        },

    ]

},
]
const router =createRouter(
    {
        history:createWebHashHistory(),
        routes
    }
)
export default router
