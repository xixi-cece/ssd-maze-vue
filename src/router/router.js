export const routerPath = [
    {
        path:'/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        meta:{
            title:'登录',
            keepAlive: false,//不需要缓存
        },
        name: 'Login',
        component: resolve=>{
            require(['@/views/Login.vue'],resolve)
        },
        children:[]
    },
    {
        path: '/Bind',
        meta:{
            title:'绑定账号',
            keepAlive: false,//不需要缓存
        },
        name: 'Bind',
        component: resolve=>{
            require(['@/views/Bind.vue'],resolve)
        },
        children:[]
    },
    {
        path: '/Forgetpassword',
        meta:{
            title:'忘记密码',
            keepAlive: false,//不需要缓存
        },
        name: 'Forgetpassword',
        component: resolve=>{
            require(['@/views/Forgetpassword.vue'],resolve)
        },
        children:[]
    },
    {
        path:'/sales/Home',
        name:'Home',
        meta: { 
            title: "信息总览" ,
            keepAlive: false,//不需要缓存
        },
        component:resolve=>{//按需加载组件(懒加载，一般用于包很大)
            require(['@/views/Home.vue'],resolve)
        },
        children:[]//子路由
    },
    {
        path:'/sales/Client',
        name:'Client',
        meta: { 
            title: "添加客户" ,
            keepAlive: false,//不需要缓存
        },
        component:resolve=>{//按需加载组件(懒加载，一般用于包很大)
            require(['@/views/Client.vue'],resolve)
        },
        children:[]//子路由
    },
    {
        path:'/sales/Waitclient',
        name:'Waitclient',
        meta: { 
            title: "待处理新客户" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Waitclient.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/Talking',
        name:'Talking',
        meta: { 
            title: "正在勾搭" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Talking.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/SendQues',
        name:'SendQues',
        meta: { 
            title: "已发问卷" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/SendQues.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/SendBook',
        name:'SendBook',
        meta: { 
            title: "已发合同" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/SendBook.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/Payclient',
        name:'Payclient',
        meta: { 
            title: "付款完成" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Payclient.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/Sinclient',
        name:'Sinclient',
        meta: { 
            title: "签约完成" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Sinclient.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/CacheSign',
        name:'CacheSign',
        meta: { 
            title: "放弃签约" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/CacheSign.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/Submitmon',
        name:'Submitmon',
        meta: { 
            title: "提成提交" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Submitmon.vue'),
        children:[]//子路由
    },
    {
        path: '/sales/Wait/:id',
        meta: { 
            title: '正在处理中',
            keepAlive: false,//需要缓存
        },
        name: 'Wait',
        component: ()=>import('@/views/Wait.vue'),
        children:[]
    },
    {
        path:'/sales/Addsales',
        name:'Addsales',
        meta: { 
            title: "添加销售" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Addsales.vue'),
        children:[]//子路由
    },
    {
        path:'/sales/Comcalc',
        name:'Comcalc',
        meta: { 
            title: "提成计算" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Comcalc.vue'),
        children:[]//子路由
    },
    /*
    *个性化导师
    */
    // {
    //     path:'/individuation/Info',
    //     name:'Info',
    //     meta: { 
    //         title: "信息总览" ,
    //         keepAlive: false,//不需要缓存
    //     },
    //     component:()=>import('@/views/Info.vue'),
    //     children:[]//子路由
    // },
    {
        path:'/individuation/Report',
        name:'Report',
        meta: { 
            title: "填报工时" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Report.vue'),
        children:[]//子路由
    },
    {
        path:'/individuation/Checkmoney',
        name:'Checkmoney',
        meta: { 
            title: "查看工资" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Checkmoney.vue'),
        children:[]//子路由
    },
    {
        path:'/individuation/Personinfo',
        name:'Personinfo',
        meta: { 
            title: "个人信息" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Personinfo.vue'),
        children:[]//子路由
    },
    /**
     * 实习生
     */
    {
        path:'/trainee/Writetime',
        name:'Writetime',
        meta: { 
            title: "填报工时" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Writetime.vue'),
        children:[]//子路由
    },
    {
        path:'/trainee/Readmoney',
        name:'Readmoney',
        meta: { 
            title: "查看工资" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Readmoney.vue'),
        children:[]//子路由
    },
    {
        path:'/trainee/Perinfo',
        name:'Perinfo',
        meta: { 
            title: "个人信息" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Perinfo.vue'),
        children:[]//子路由
    },
    /**
     * admin用户
     */
    {
        path:'/admin/user',
        name:'User',
        meta: { 
            title: "查看用户" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/User.vue'),
        children:[]//子路由
    },
    {
        path:'/admin/mentee',
        name:'mentee',
        meta: { 
            title: "学员配对" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Mentee.vue'),
        children:[]//子路由
    },
    {
        path:'/admin/rescoretool',
        name:'rescoretool',
        meta: {
            title: "资源工具" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Resourcetool.vue'),
        children:[]//子路由
    },
    {
        path: '/admin/Resourcetooldetail/:id',
        meta: { 
            title: '资源工具',
            parentpath:'/admin/rescoretool',
            keepAlive: false,//需要缓存
        },
        name: 'Resourcetooldetail',
        component: ()=>import('@/views/Resourcetooldetail.vue'),
        children:[]
    },
    {
        path:'/admin/AddRestool',
        name:'AddRestool',
        meta: { 
            title: "资源工具" ,
            parentpath:'/admin/rescoretool',
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/AddRestool.vue'),
        children:[]//子路由
    },
    {
        path: '/admin/Addsch',
        meta: { 
            title: '添加院校',
            keepAlive: false,//需要缓存
        },
        name: 'Addsch',
        component: ()=>import('@/views/Addsch.vue'),
        children:[]
    },
    {
        path: '/admin/Schlist',
        meta: { 
            title: 'STGS院校库',
            keepAlive: false,//需要缓存
        },
        name: 'Schlist',
        component: ()=>import('@/views/Schlist.vue'),
        children:[]
    },
    /**
     * 兼职导师
     */
    {
        path:'/partur/partmoney',
        name:'partmoney',
        meta: { 
            title: "兼职导师工资" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partmoney.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/partmorlist',
        name:'partmorlist',
        meta: { 
            title: "兼职导师列表" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partmorlist.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/partvormoney',
        name:'partvormoney',
        meta: { 
            title: "实习生工资" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partvormoney.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/partvorlist',
        name:'partvorlist',
        meta: { 
            title: "实习生列表" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partvorlist.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/partworkback',
        name:'partworkback',
        meta: { 
            title: "合作方返点" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partworkback.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/partworklist',
        name:'partworklist',
        meta: { 
            title: "合作方列表" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/partworklist.vue'),
        children:[]//子路由
    },
    {
        path:'/partur/receivepay',
        name:'Receivepay',
        meta: { 
            title: "收款确认" ,
            keepAlive: false,//不需要缓存
        },
        component:()=>import('@/views/Receivepay.vue'),
        children:[]//子路由
    },
    /**
     *行政导师 
     */
    {
        path: '/administration/Custermor/:id/:username/:type',
        meta: { 
            title: '客户详情',
            keepAlive: false,//需要缓存
        },
        name: 'Custermor',
        component: ()=>import('@/views/Custermor.vue'),
        children:[]
    },
    {
        path: '/administration/Extrareport',
        meta: { 
            title: '额外汇报',
            keepAlive: false,//需要缓存
        },
        name: 'Extrareport',
        component: ()=>import('@/views/Extrareport.vue'),
        children:[]
    },
    {
        path: '/administration/Voicerecord',
        meta: { 
            title: '行政记录',
            parentpath:'/mentee/Hisrecord',
            keepAlive: false,//需要缓存
        },
        name: 'Voicerecord',
        component: ()=>import('@/views/Voicerecord.vue'),
        children:[]
    },
    {
        path: '/administration/Groupinfo',
        meta: { 
            title: '行政记录',
            parentpath:'/mentee/Hisrecord',
            keepAlive: false,//需要缓存
        },
        name: 'Groupinfo',
        component: ()=>import('@/views/Groupinfo.vue'),
        children:[]
    }
];