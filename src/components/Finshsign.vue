<template>
    <div id="Finshsign">
        <Modal
            class="modToast"
            v-model="showToast"
            width='388'
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>完成签约</span>
                <img class="close" src="../images/close.png" @click="closeToast">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{currtObj.chinesename}}</span>
                </li>
                <li>
                    <h4 class="labTile">销售姓名</h4>
                    <span class="labCont">{{currtObj.assignedSalesCNName?currtObj.assignedSalesCNName:currtObj.assignedsale}}</span>
                </li>
            </ul>
            <ul class="labBox">
                <li style="margin-right:0;">
                    <h4 class="labTile">Maze账号</h4>
                    <span class="labCont">
                        <Input v-model="accout" readonly placeholder="Maze账号" style="width:75%;"/>
                        <Button class="suerBtn" style="width:20%;" @click="copyAcout('学员账户：'+accout+'\n密码：'+password)">复制</Button>
                    </span>
                </li>
            </ul>
            <!-- <div class="line"></div> -->
            <Divider orientation="center"></Divider>
            <div>
                <span style="margin-right:20px;">是否有返点？</span>
                <RadioGroup v-model="backjg">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                </RadioGroup>
            </div>
            <h4 class="tileTig">需要返点的机构</h4>
            <div class="saleBox" v-if="backjg=='是'">
                <Select v-model="slemanger" style="width:100%;">
                    <Option v-for="item in mangerlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <Button class="suerBack" @click="sureSend">确认</Button>
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
    </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
    name: 'Finshsign',
    props: {
        dataObj:{
            type:Object,
            default:()=>{}
        },
        showToast:{
            type:Boolean,
            default:false
        }
    },
    watch: {
        dataObj:{
            handler(now){
                try{
                    this.currtObj = now;
                    this.selId = now.id;
                    if(this.selId){
                        this.getAccout();
                    }
                }catch(e){}
            },
            deep:true,
            immediate:true
        }
    },
    components: {

    },
    data() {
        return {
            accout:'',//maze账号
            password:'',//maze密码
            backjg:'否',
            slemanger:'',
            currtObj:{},
            selId:'',
            mangerlist:[],//机构列表
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        if(this.selId){
            this.getAccout();
        }
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        closeToast(){
            this.$emit('closefinsh',false);
        },
        getAccout(){
            this.$https.newbeeaccount({
                id:this.selId
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.accout = res.mazeaccount;
                    this.password = res.password;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        sureSend(){
            this.$https.startStatus({
                id:this.selId,
                newstatus:'signed'
            }).then(res=>{
                this.$emit('closefinsh',true);
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist',true);
                }else{
                    this.$Message.error('操作失败！');
                };
            });
        },
        copyAcout(data){
            // this.modal2 = false;
            let clipboard = new Clipboard('.suerBtn', {
                text: function () {
                    return data
                }
            });
            clipboard.on('success', (e)=>{
                this.$Message.success('复制成功！');
                // 释放内存
                clipboard.destroy();
                e.clearSelection();
            });
            clipboard.on('error', (e)=>{
                this.$Message.error('复制失败！');
                clipboard.destroy();
                e.clearSelection();
            });
        }
    }
};
</script>

<style lang="scss">
#Finshsign{

}
// 模态框
.modToast{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #333;
        font-size: 18px;
        padding: 21px 16px;
        .close{
            float: right;
            margin-top: -4px;
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
    .line{
        height: .5px;
        background-color: #ddd;
        width: 100%;
        margin: 25px 0;
    }
    .labBox{
        display: flex;
        flex-flow: wrap;
        >li{
            flex: 1;
            box-sizing: border-box;
            &:first-of-type{
                margin-right: 30px;
            }
            .labTile{
                font-weight: 400;
                font-size: 14px;
                color: #A3A3A3;
            }
            .tileWet{
                color: #666;
                font-size: 16px;
            }
            .labCont{
                font-size: 16px;
                margin-top: 5px;
                display: block;
                .suerBtn{
                    vertical-align: middle;
                    float: right;
                }
            }
            .gpBox{
                margin-top: 5px;
                .ivu-radio-inner:after{
                    top:2.5px;
                    left: 2.5px;
                }
            }
        }
    }
    .tileTig{
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #A3A3A3;
    }
    .suerBack{
        display: block;
        width: 100px;
        margin: 20px auto 0;
        background-color: #1665D8;
        color: #fff;
    }
    .saleBox{
        margin-top: 5px;
    }
    // .suerBtn{
    //     width: 100%;
    //     margin-top: 20px;
    //     background-color: #51BD63;
    //     color: #fff;
    //     border: 1px solid #51BD63;
    // }
    .tig{
        position: absolute;
        bottom: -32px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
}
</style>