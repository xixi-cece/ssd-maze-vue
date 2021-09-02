<template>
    <div id="Schlist">
        正在开发中...
        <!-- <div class="ltItem">
            <div class="topserch">
                <Input v-model="schval" placeholder="搜索院校" />
                <Button type="primary">搜索</Button>
            </div>
            <div class="tabBox">
                <Tabs value="stg1" name="stgmain">
                    <TabPane label="美国" name="stg1" tab="stgmain">
                        <div class="listbox">
                            <div class="listItem" v-for="(v,i) in datalist" :key="i">
                                <span>{{v.title}}</span>
                                <b>{{v.tig}}</b>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="英国" name="stg2" tab="stgmain">
                        <div class="listbox">
                            <div class="listItem" v-for="(v,i) in datalist" :key="i">
                                <span>{{v.title}}</span>
                                <b>{{v.tig}}</b>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="加拿大" name="stg3" tab="stgmain">
                        <div class="listbox">
                            <div class="listItem" v-for="(v,i) in datalist" :key="i">
                                <span>{{v.title}}</span>
                                <b>{{v.tig}}</b>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="其他（香港、日本、新加坡）" name="stg4" tab="stgmain">
                        <div class="listbox">
                            <div class="listItem" v-for="(v,i) in datalist" :key="i">
                                <span>{{v.title}}</span>
                                <b>{{v.tig}}</b>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <div class="riItem">
            <div class="lstcard">
                <h3>美国院校录取情况</h3>
                <Divider />
                <div class="itemList" v-for="(item,j) in recodelist" :key="j">
                    <b>{{j+1}}</b>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="lstcard">
                <h3>英国院校录取情况</h3>
                <Divider />
                <div class="itemList" v-for="(item,j) in recodelist" :key="j">
                    <b>{{j+1}}</b>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="lstcard">
                <h3>加拿大院校录取情况</h3>
                <Divider />
                <div class="itemList" v-for="(item,j) in recodelist" :key="j">
                    <b>{{j+1}}</b>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name:'Schlist',
    data() {
        return {
            schval:'',
            datalist:[
                {
                    title:'学校名称名称名称名称名称名称',
                    tig:'US前20'
                },
                {
                    title:'学校名称名称名称名称名称名称',
                    tig:'US前20'
                }
            ],
            recodelist:[
                {
                    title:'学校名称学校名称学校名称学校名称名'
                },
                {
                    title:'学校名称学校名称学校名称学校名称名'
                },
                {
                    title:'学校名称学校名称学校名称学校名称名'
                },
                {
                    title:'学校名称学校名称学校名称学校名称名'
                },
                {
                    title:'学校名称学校名称学校名称学校名称名'
                }
            ]
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {

    }
};
</script>

<style lang='scss'>
#Schlist{
    display: flex;
    background-color: #fff;
    padding: 40px 70px;
    .ltItem{
        flex: 1;
        .topserch{
            .ivu-input-wrapper{
                width:500px;
            }
            .ivu-input{
                height: 38px;
            }
            input{
                background-color: #EAEDF3;                
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
                border-radius: 4px;
                border: 1px solid #EAEDF3;
            }
            .ivu-btn{
                height: 38px;
                background-color: #1665D8;
                margin-left: 16px;
            }
        }
        .tabBox{
            .ivu-tabs-bar{
                border: none;
                background-color: #fff;
                margin-bottom: 24px;
            }
            .ivu-tabs-tab{
                padding: 25px 6px;
            }
            .ivu-tabs-nav{
                color: #6B6C6F;
                font-size: 16px;
            }
            .ivu-tabs-nav .ivu-tabs-tab-active{
                color: #3E3F42;
                font-weight:600;
            }
            .ivu-tabs-ink-bar{
                background-color: #1665D8;
            }
            .ivu-tabs-content{
                box-sizing: border-box;
            }
            .listbox{
                .listItem{
                    border-bottom: 1px solid #EAEDF3;
                    padding: 20px 0;
                    >span{
                        font-weight: 600;
                        font-size: 16px;
                    }
                    >b{
                        font-weight: normal;
                        font-size: 12px;
                        background-color: rgba(27, 187, 187, .1);
                        color: #1BBBBB;
                        padding: 2px 12px;
                        border-radius: 2px;
                        margin-left: 30px;
                    }
                }
            }
        }
    }
    .riItem{
        width:25%;
        margin-left: 122px;
        .lstcard{
            margin-top: 64px;
            >h3{
                font-size: 14px;
            }
            .itemList{
                margin-bottom: 10px;
                >b{
                    display: inline-block;
                    padding: 1px 6px;
                    border-radius: 2px;
                    font-size: 12px;
                    background-color: rgba(158, 160, 165, .1);
                    color: #6B6C6F;
                    margin-right: 10px;
                    font-weight: normal;
                    vertical-align: middle;
                }
                >span{
                    width: 208px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: inline-block;
                    vertical-align: middle;
                }
                &:nth-of-type(2){
                    >b{
                        background-color: rgba(230, 74, 45, .1);
                        color: #E64A2D;
                    }
                }
                &:nth-of-type(3){
                    >b{
                        background-color: rgba(53, 170, 69, .1);
                        color: #35AA45;
                    }
                }
                &:nth-of-type(4){
                    >b{
                        background-color: rgba(103, 89, 243, .1);
                        color: #6759F3;
                    }
                }
            }
        }
    }
}
</style>