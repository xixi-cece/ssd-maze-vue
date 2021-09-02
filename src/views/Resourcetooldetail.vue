<template>
    <div id="Resourcetooldetail">
        <div class="wrapbox">
            <h3 class="headtip"><Icon type="ios-arrow-back" @click="goBack" />查看文章</h3>
            <div class="contBox">
                <h3>{{webtile}}</h3>
                <div class="rowline">
                    <span>{{author}}</span>
                    <span>{{createDate}}</span>
                </div>
                <div class="tipbox">
                    <span v-for="(v,i) in lablist" :key="i">{{v}}</span>
                </div>
                <Divider />
                <p ref='editorElem' class="wangeditorbox"></p>
            </div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor';

export default {
    name:'Resourcetooldetail',
    data() {
        return {
            id:'',
            webtile:'',
            author:'',
            createDate:'',
            lablist:[],
            editor:null
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    created() {
        const data = this.$route.params;
        this.id = data.id;
    },
    mounted() {
        this.initeditor();
        this.getData();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        goBack(){
            this.$router.push({
                path:'/admin/rescoretool'
            });
        },
        getData(){
            this.$https.lookrescore({
                id:this.id
            }).then(res=>{
                if(res&&res.code==200){
                    this.lablist = res.data.tags;
                    this.author = res.data.author;
                    this.createDate = res.data.createDate;
                    this.editor.txt.html(res.data.text);
                    this.webtile = res.data.title;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        initeditor(){
            this.editor = new E(this.$refs.editorElem);
            //菜单配置
            this.editor.customConfig.menus = [];
            this.editor.create(); // 创建富文本实例
            // 禁用编辑功能
            this.editor.$textElem.attr('contenteditable', false)
        }
    }
};
</script>

<style lang='scss'>
#Resourcetooldetail{
    .wrapbox{
        box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
        border-radius:4px;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #EAEDF3;
        .headtip {
            height: 64px;
            line-height: 64px;
            font-size:18px;
            padding-left: 25px;
            border-bottom: 1px solid #EAEDF3;
            .ivu-icon{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 10px;
                cursor: pointer;
            }
        }
        .contBox {
            padding: 30px 165px;
            >h3{
                font-size: 16px;
            }
            .rowline{
                margin: 15px 0;
                >span{
                    color: #9EA0A5;
                    margin-right: 20px;
                    font-size: 14px;
                }
            }
            .tipbox{
                >span{
                    background-color: #F5F6FA;
                    border-radius: 2px;
                    padding: 4px 10px;
                    font-size: 12px;
                    color: #1665D8;
                    margin-right: 10px;
                    &:last-of-type{
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .wangeditorbox{
        .w-e-toolbar{
            display: none;
        }
        .w-e-text-container{
            border: none!important;
        }
        .w-e-text{
            overflow: hidden;
            padding: 0;
        }
        .w-e-text-container{
            height: auto!important;
        }
    }
}
</style>