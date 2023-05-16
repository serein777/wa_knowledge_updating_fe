export default {
    getHomeData:()=>{
        return {
            code:200,
            data: {
                tableData:[
                    {
                        name:'test1',
                        todayBuy:200,
                        monthBuy: 1200,
                        totalBuy: 5000
                    }
                ]
            }
        }
    }
}