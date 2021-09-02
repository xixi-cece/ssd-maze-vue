export const otherPath = [
    {
        path:'/sales/EditInfo',
        name:'EditInfo',
        meta: { 
            title: "学员信息" ,
            keepAlive: true,//需要缓存
        },
        component: ()=>import('@/views/EditInfo.vue')
    },
    {
        path:'/sales/Areatab',
        name:'Areatab',
        meta: { 
            title: "地区业绩" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Areatab.vue')
    },
    {
        path:'/sales/Areasign',
        name:'Areasign',
        meta: { 
            title: "地区已签约" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Areasign.vue')
    },
    {
        path:'/sales/Areagoing',
        name:'Areagoing',
        meta: { 
            title: "地区处理中" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Areagoing.vue')
    },
    {
        path:'/sales/Waitsplit',
        name:'Waitsplit',
        meta: { 
            title: "待分配客户" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Waitsplit.vue')
    },
    {
        path:'/sales/Finshsplit',
        name:'Finshsplit',
        meta: { 
            title: "已分配客户" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Finshsplit.vue')
    },
    {
        path:'/sales/Totalbook',
        name:'Totalbook',
        meta: { 
            title: "总业绩" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Totalbook.vue')
    },
    {
        path:'/sales/Totalsign',
        name:'Totalsign',
        meta: { 
            title: "总已签约" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Totalsign.vue')
    },
    {
        path:'/sales/Totalgoing',
        name:'Totalgoing',
        meta: { 
            title: "总处理中" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Totalgoing.vue')
    },
    /**
     * 学员
     */
    {
        path:'/mentee/Totalinfo',
        name:'Totalinfo',
        meta: { 
            title: "信息总览" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Totalinfo.vue')
    },
    {
        path:'/mentee/Hisrecord',
        name:'Hisrecord',
        meta: { 
            title: "行政记录" ,
            keepAlive: false,//需要缓存
        },
        component: ()=>import('@/views/Hisrecord.vue')
    },
    {
        path: '/mentee/keywordHis',
        meta: { 
            title: '考试成绩',
            keepAlive: false,//需要缓存
        },
        name: 'keywordHis',
        component: ()=>import('@/views/keywordHis.vue'),
        children:[]
    },
    {
        path: '/mentee/Baseperinfo',
        meta: { 
            title: '个人信息',
            keepAlive: false,//需要缓存
        },
        name: 'Baseperinfo',
        component: ()=>import('@/views/Baseperinfo.vue'),
        children:[]
    },
    /**
     * 马丽端
     */
    {
        path: '/insightmenus/Insclassactive',
        meta: { 
            title: '课外活动',
            keepAlive: false,//需要缓存
        },
        name: 'Insclassactive',
        component: ()=>import('@/views/Insclassactive.vue'),
        children:[]
    },
    {
        path: '/insightmenus/Inssumscrool',
        meta: { 
            title: '夏校',
            keepAlive: false,//需要缓存
        },
        name: 'Inssumscrool',
        component: ()=>import('@/views/Inssumscrool.vue'),
        children:[]
    },
    {
        path: '/insightmenus/Inscontest',
        meta: { 
            title: '竞赛',
            keepAlive: false,//需要缓存
        },
        name: 'Inscontest',
        component: ()=>import('@/views/Inscontest.vue'),
        children:[]
    },
    {
        path: '/insightmenus/PublishActive',
        meta: { 
            title: '课外活动',
            keepAlive: false,//需要缓存
        },
        name: 'PublishActive',
        component: ()=>import('@/views/PublishActive.vue'),
        children:[]
    }
];