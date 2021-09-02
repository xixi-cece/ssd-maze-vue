<template>
    <div id="HeadMenu">
        <Header class="headBox">
            <div class="fl leftBox">
                <span>{{pagetitle}}</span>
                <div
                    v-if="showtig"
                    class="btnbox" 
                    :style="{backgroundColor:type=='u'?'#1665D8':type=='g'?'#E6492D':type=='t'?'#6758F3':type=='uk'?'#34AA44':
                    type=='p'?'#F6AB2F':type=='s'?'#FACF55':type=='o'?'#3E3F42':type=='c'?'#1BBBBB':''}"
                >
                    <Icon 
                        :custom="type=='u'?'iconfont iconmeiguobenke'
                        :type=='g'?'iconfont iconyanjiusheng':type=='t'?
                        'iconfont iconzhuanxue':type=='uk'?'iconfont iconyingguobenke':
                        type=='p'?'iconfont icondanpianPS':type=='s'?'iconfont iconqitadanpianPS'
                        :type=='o'?'iconfont iconqita':type=='c'?'iconfont iconqitaguojia1':''"
                    ></Icon>
                    <span class="btnspan">{{type=='u'?'本科':type=='g'?'研究生':type=='t'?'转学':type=='uk'?'英国':type=='p'?'单篇PS':type=='s'?'其它单篇':type=='o'?'其他':type=='c'?'其他国家':''}}</span>
                </div>
            </div>
            <div class="fr rightBox">
                <!-- <input type="text" class="search"> -->
                <img class="headImg" src="../images/default.png" alt="头像">
                <span class="username">{{chinesename}}</span>
                <Icon class="backIcon" title="退出" custom="iconfont iconzhuxiao" @click="backLogin" />
            </div>
        </Header>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            showtig:false,
            type:'',
            name:'',
            chinesename:'',//姓名
            pagetitle:'客户详情'
        };
    },
    computed: {

    },
    created() {
        this.chinesename = sessionStorage.getItem('chinesename');
        this.name = sessionStorage.getItem('mentame');
    },
    mounted() {
        this.$nextTick(()=>{
            if(this.name){
              this.pagetitle = '客户详情 - '+this.name;
            };
        });
        this.$bus.$on('cName',res=>{
            this.pagetitle = '客户详情 - '+res;
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {
        $route:{
            handler(now,old){
                if(now.matched.length&&now.matched[0].path=='/administration/Custermor/:id/:username/:type'){
                    // console.log(now.params.type);
                    this.type = now.params.type;
                    this.showtig = true;
                }else{
                    this.pagetitle = now.meta.title;
                    this.showtig = false;
                };
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        backLogin(){
            this.$https.loginOut({}).then(res=>{
                if(res&&res.status=='success'){
                    sessionStorage.clear();
                    this.$router.go(0);
                }else{
                    this.$Message.error('退出失败！');
                }
            })
        }
    },
    components: {

    },
};
</script>

<style lang="scss">
#HeadMenu{
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 240px;
    z-index: 5;
    width: calc(100% - 233px);
    .ivu-layout-header{
        padding: 0 30px;
    }
    .headBox{
        color: #3E3F42;
        .leftBox{
            font-size: 18px;
            font-weight: 600;
            img{
                vertical-align: middle;
                height: 35px;
            }
        }
        >.rightBox{
            position: relative;
            .search{
                height: 35px;
                // border-radius: 25px;
                border: none;
                padding: 0 15px;
            }
            .headImg{
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background-color: #fff;
                vertical-align: middle;
                margin: 0 10px;
            }
            .backIcon{
                cursor: pointer;
                font-size: 14px;
                margin-left: 10px;
                color: #9ea0a5;
                vertical-align: middle;
            }
        }
    }
    .btnbox{
        position: fixed;
        // height: 30px;
        top:5px;
        left: 450px;
        z-index: 5;
        padding: 2px 14px 4px 10px;
        border-radius: 4px;
        color: #fff;
        vertical-align: middle;
        margin-top: 12px;
        line-height: initial;
        .ivu-icon {
            font-size: 24px;
            vertical-align: middle;
        }
        .btnspan{
            color: #fff;
            vertical-align: middle;
            margin-top: 18px;
            max-width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
        }
    }
}
</style>