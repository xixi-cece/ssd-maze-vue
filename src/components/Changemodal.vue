<template>
    <div id="Changemodal">
        <Modal
            class="Changemodal"
            v-model="chmodal"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>修改工时</span>
                    <img class="close" src="../images/close.png" @click="closeToast">
                </div>
            </template>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">工作类型</span>
                    <Select v-model="dataInfo.workType" @on-change="getworkVal" style="width:100%">
                        <Option v-for="(item,i) in cityList" :value="item.label" :key="i">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="col_line">
                    <span class="tigname">选择学员</span>
                    <!-- <span v-if="dataInfo.workType=='专项'" class="mentbe">专项</span> -->
                    <Select
                        v-model="dataInfo.menteeId"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                        style="width:100%"
                    >
                        <Option v-for="(item,j) in menteeList" :value="item.menteeId" :key="j">{{ item.chineseName }}</Option>
                    </Select>
                </div>
                <div class="col_line">
                    <span class="tigname">工作日期</span>
                    <DatePicker type="date" :value="dataInfo.workDate" @on-change="changeDate" placeholder="选择日期" style="width: 100%"></DatePicker>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">开始时间</span>
                    <TimePicker format="HH:mm" v-model="dataInfo.startTime" @on-change="chsta_time" placeholder="选择时间" style="width: 100%"></TimePicker>
                </div>
                <div class="col_line">
                    <span class="tigname">结束时间</span>
                    <TimePicker format="HH:mm" v-model="dataInfo.endTime" @on-change="chend_time" placeholder="选择时间" style="width: 100%"></TimePicker>
                </div>
                <div class="col_line">
                    <span class="tigname">工作时长</span>
                    <span class="time">{{dataInfo.workHours}}</span>
                </div>
            </div>
            <h4 class="titletig">具体工作内容</h4>
            <div class="iptbox">
                <Input style="height:100%;resize:none;" v-model="dataInfo.workContent" type="textarea" placeholder="请输入" />
            </div>
            <div class="btnBox">
                <Button class="button" @click="oksure">确认</Button>
                <Button class="button" @click="cancelbtn">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'Changemodal',
    props: {
        chmodal:{
            type:Boolean,
            default:false
        },
        dataObj:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            model5:'',
            msg:'',
            cityList:[
                {
                    label:'文书修改'
                },
                {
                    label:'校内课业'
                },
                {
                    label:'活动竞赛'
                },
                {
                    label:'面试辅导'
                },
                {
                    label:'标化考试'
                },
                {
                    label:'其他'
                },
            ],
            menteeList:[],
            loading:false,
            seloption:[],
            dataInfo:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getstudentlist();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {
        dataObj:{
            handler(now,old){
                this.dataInfo = JSON.parse(JSON.stringify(now));
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        oksure(){
            this.$emit('closestatu',1,this.dataInfo);
        },
        cancelbtn(){
            this.$emit('closestatu',0);
        },
        changeDate(data){
            this.dataInfo.workDate = data;
        },
        closeToast(e){
            // const dom = this.$refs.childMask;
            // if(dom){
            //     if(!dom.contains(e.target)){
            //         this.$emit('finsh','noend');
            //     }
            // }
            this.$emit('closestatu',0);
        },
        chsta_time(data){
            this.dataInfo.startTime = data;
            this.dataInfo.endTime = "00:00";
            this.dataInfo.workHours = 0;
            this.dataInfo.minuteTime = 0;
        },
        getworkVal(data){
            // this.dataInfo.menteeId = '';
        },
        getstudentlist(){
            this.$https.getstudes({}).then(res=>{
                if(res&&res.code==200){
                    this.menteeList = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        chend_time(data){
            this.dataInfo.endTime = data;
            let fintime = '';
            let hour = 0;
            let minute = 0;
            const s_time = this.dataInfo.startTime.split(':');
            const e_time = data.split(':');
            const endmin = e_time[0]*60+Number(e_time[1]);
            const starmin = s_time[0]*60+Number(s_time[1]);
            if(endmin-starmin<0){
                this.$Message.error('结束时间不能小于开始时间！');
                this.endTime = '00:00';
                return;
            };
            let finmin = endmin-starmin;
            hour = Math.floor(finmin/60);
            minute = finmin%60;
            // if(e_time[0]<s_time[0]){
            //     this.$Message.error('结束时间不能小于开始时间！');
            //     this.endTime = '00:00';
            //     return;
            // };
            // if(e_time[0]-s_time[0]>0){
            //     fintime = e_time[0]-s_time[0] + '小时';
            //     hour = e_time[0]-s_time[0];
            // };
            // if(e_time[1]-s_time[1]>0){
            //     fintime = fintime + (e_time[1]-s_time[1] + '分钟')
            //     minute = e_time[1]-s_time[1];
            // };
            // this.dataInfo.workHours = fintime;
            this.dataInfo.minuteTime = hour*60 + minute;
            this.dataInfo.workHours =  minute>0?(hour+'小时'+minute+'分钟'):hour+'小时';
        },
        remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.menteeList.map(item => {
                        return {
                            username: item.username,
                            chineseName: item.chineseName
                        };
                    });
                    this.seloption = list.filter(item => item.chineseName.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.seloption = [];
            };
        }
    }
};
</script>

<style lang="scss">
#Changemodal{
    
}
.Changemodal{
    .ivu-input{
        color: #3E3F42;
    }
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        padding: 21px 16px;
        .tilehead{
            color: #3E3F42;
            font-size: 18px;
            font-weight: 600;
            line-height: 15px;
            .close{
                float: right;
                margin-top: -4px;
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }
    }
    .row_box{
        display: flex;
        .col_line{
            flex: 1;
            margin-right: 20px;
            &:last-of-type{
                margin-right: 0;
            }
            .tigname{
                display: block;
                color: #9EA0A5;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .time{
                color: #3E3F42;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
    .titletig{
      color: #9EA0A5;
      font-weight: normal;
      line-height: 35px;
      height: 35px;
    }
    .iptbox{
      height: 120px;
      textarea{
        height: 100%;
      }
    }
    .btnBox{
        display: flex;
        margin-top: 35px;
        margin-bottom: 20px;
        .button{
            flex: 1;
            background-color: #1665D8;
            color: #fff;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>