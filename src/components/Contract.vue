<template>
    <div id="Contract" v-if="showToast">
        <!-- <Modal
            class="htDetail"
            v-model="showMask"
            :closable="false"
            :footer-hide="true"
        > -->
        <div class="htDetail" ref="childMask">
            <h3 slot="header" class="headTile">
                <span>{{!isLook?'发送合同':'合同信息'}}</span>
                <!-- <span class="fr closeModal" @click="closeToast">&times;</span> -->
                <span class="rigtIcon">
                    <img v-if="isLook" class="editIcon" @click="changeStatu" src="../images/edit.png">
                    <img class="closeIcon" src="../images/close.png" @click="closeToast">
                </span>
            </h3>
            <div class="contBox">
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">学员姓名</h4>
                        <span class="labCont">{{curtmentee.chinesename}}</span>
                    </li>
                    <li v-if="curtstu==1&&isLook">
                        <h4 class="labTile">支付类型</h4>
                        <span class="labCont">
                            <b class="blueBtn" v-if="paylx">{{paylx}}</b>
                        </span>
                    </li>
                    <li v-else>
                        <h4 class="labTile">学生资质</h4>
                        <Select v-model="studenttype" style="width:100%;">
                            <Option v-for="(v,i) in stutypelist" :key="i" :value='v'>{{v}}</Option>
                        </Select>
                    </li>                   
                </ul>
                <!-- <p class="line"></p> -->
                <ul class="labBox">
                    <li>
                        <h4 class="labTile tiletip">总金额</h4>
                        <Input v-if="curtstu==0" v-model="totalmoney" style="width: 100%;" />
                        <span v-else>{{totalmoney}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">收款账户</h4>
                        <Select v-if="curtstu==0" v-model="paytype" style="width:100%;">
                            <Option v-for="item in paytypelist" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span v-else>{{paytype}}</span>
                    </li>
                </ul>
                <ul class="labBox" v-if="curtstu==0">
                    <li>
                        <h4 class="labTile tiletip" style="color:#333;">支付类型</h4>
                    </li>
                    <li>
                        <RadioGroup v-model="radioGp">
                            <Radio label="一期"></Radio>
                            <Radio label="二期"></Radio>
                            <Radio label="三期"></Radio>
                        </RadioGroup>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile tiletip">第一期应收金额</h4>
                        <Input v-if="curtstu==0" v-model="paymoney" style="width: 100%;" />
                        <span v-else>{{paymoney}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">第一期支付时间</h4>
                        <DatePicker v-if="curtstu==0" type="date" v-model="paytime" @on-change="getDateVal" placeholder="选择时间" style="width: 100%"></DatePicker>
                        <span v-else>{{paytime}}</span>
                    </li>
                </ul>
                <ul class="labBox" v-if="radioGp=='二期'||radioGp=='三期'">
                    <li>
                        <h4 class="labTile tiletip">第二期应收金额</h4>
                        <Input v-if="curtstu==0" v-model="endmoney" style="width: 100%;" />
                        <span v-else>{{endmoney}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">第二期支付时间</h4>
                        <DatePicker v-if="curtstu==0" type="date" v-model="nextpaytime" @on-change="getTowDate" placeholder="选择时间" style="width: 100%;"></DatePicker>
                        <span v-else>{{nextpaytime}}</span>
                    </li>
                </ul>
                <ul class="labBox" v-if="radioGp=='三期'">
                    <li>
                        <h4 class="labTile tiletip">第三期应收金额</h4>
                        <Input v-if="curtstu==0" v-model="threendmoney" style="width: 100%;" />
                        <span v-else>{{threendmoney}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">第三期支付时间</h4>
                        <DatePicker v-if="curtstu==0" type="date" v-model="threenextpaytime" @on-change="getThreeDate" placeholder="选择时间" style="width: 100%;"></DatePicker>
                        <span v-else>{{threenextpaytime}}</span>
                    </li>
                </ul>
                <!-- <p class="line"></p> -->
                <ul class="labBox">
                    <li style="width:100%;margin-right:0;">
                        <h4 class="labTile tiletip">辅助销售<Icon v-if="curtstu==0" class="blueIcon" type="ios-add-circle-outline" @click="addSales" /></h4>
                        <div class="selctBox" v-if="curtstu==0">
                            <div v-for="(v,i) in salesothlist" :key="i" class="salesFlex">
                                <span>
                                    <Select 
                                        v-model="v.id"
                                        filterable
                                        remote
                                        :remote-method="remoteMethod"
                                        :loading="loading"
                                        @on-change='changeSelete(v)'
                                    >
                                        <Option v-for="item in mangerlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                                    </Select>
                                </span>
                                <span>
                                    <Select
                                        v-model='v.type'
                                        :disabled='v.ifsales'
                                        placeholder='助签档次'
                                    >
                                        <Option value="第一档">第一档</Option>
                                        <Option value="第二档">第二档</Option>
                                        <Option value="第三档">第三档</Option>
                                    </Select>
                                </span>
                                <span>
                                    <Icon type="md-close" @click="delSale(i)" />
                                </span>
                            </div>
                        </div>
                        <div class="dataInput" v-else>
                            <span class="spanItem" v-for="item in salesothlist">
                                {{item.chinesename}}
                                <b>{{item.type=='第一档'?'i':item.type=='第二档'?'ii':item.type=='第三档'?'iii':''}}</b>
                            </span>
                        </div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="width:100%;">
                        <h4 class="labTile">返点机构/个人</h4>
                        <Input v-if="curtstu==0" v-model="actualfrom" style="width: 100%;" />
                        <span v-else>{{actualfrom}}</span>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="width:100%;">
                        <h4 class="labTile">备注</h4>
                        <Input v-if="curtstu==0" v-model="comment" style="width: 100%;" />
                        <span v-else>{{comment}}</span>
                    </li>
                </ul>
                <Button v-if="curtstu==0" class="suerBtn" @click="goNext">确认</Button>
                <!-- <p class="tig">点击空白区域取消</p> -->
            </div>
        </div>
            
        <!-- </Modal> -->
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        menteedata:{
            type:Object,
            default:()=>{}
        },
        showToast:{
            type:Boolean,
            default:false
        },
        isLook:{
            type:Boolean,
            default:false
        },
        hascontract:{
            type:Boolean,
            default:false
        }
    },
    components: {

    },
    data() {
        return {
            isedit:false,
            curtstu:1,//（1查看，0，编辑）
            curtmentee:{},//当前学员
            showList:false,
            paylx:'',//支付类型
            showMask:true,
            paytype:'',//付款类型
            stutypelist:[],
            paytypelist:[
                {
                    value:0,
                    label:'北京公账'
                },
                {
                    value:1,
                    label:'杭州公账'
                },
                {
                    value:2,
                    label:'上海公账'
                },
                {
                    value:3,
                    label:'北京POS机'
                },
                {
                    value:4,
                    label:'杭州POS机'
                },
                {
                    value:5,
                    label:'上海POS机'
                },
                {
                    value:6,
                    label:'私账'
                }
            ],//付款类型列表
            totalmoney:'',//总金额
            paytime:'',//付款时间
            paymoney:'',//付款金额
            radioGp:'一期',
            nextpaytime:'',//下次付款日期
            endmoney:0,//剩余金额
            actualfrom:'',
            comment:'',
            threenextpaytime:'',//三期付款日期
            threendmoney:0,//三期剩余金额
            salesother:'',
            studenttype:'',//学生资质
            mangerlist:[],//辅助销售列表
            salesothlist:[],//选择的辅助销售
            loading:false,
            options:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getsalelist();
        if(this.curtmentee.uid){
            if(this.hascontract){
                this.getDetail();
            }
        }
        this.$bus.$off('editcontract');
        this.$bus.$on('editcontract',res=>{
            this.isedit = true;
        })
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {
        showToast:{
            handler(now,old){
                this.getsalelist();
            }
        },
        menteedata:{
            handler(now){
                // console.log(now);
                this.curtmentee = now;
                //金额
                this.totalmoney = 118000+20000*(now.appyear-2020);
                //学生类型
                if(now.type=='u'){
                    this.stutypelist = ['普通','优秀','种子'];
                }else if(now.type=='t'){
                    this.stutypelist = ['2所','3所','4所','不限'];
                }else if(now.type=='s'){
                    this.stutypelist = ['400字以内','400-650字'];
                }else if(now.type=='o'){
                    this.stutypelist = ['面试','其他/专项'];
                }else{
                    this.stutypelist = ['不限'];
                }
            },
            deep:true,
            immediate:true
        },
        isLook:{
            handler(now){
                if(now){
                    this.curtstu = 1;
                }else{
                    this.curtstu = 0;
                }
            },
            deep:true,
            immediate:true
        },
        radioGp:{
            handler(now){
                // console.log(now)
                if(this.curtstu==0){
                    if(now=='一期'){
                        this.paymoney = this.totalmoney;
                        this.endmoney = 0;
                        this.threendmoney = 0;
                    }else if(now=='二期'){
                        this.paymoney = this.totalmoney*0.7;
                        this.endmoney = this.totalmoney*0.3;
                        this.threendmoney = 0;
                    }else if(now=='三期'){
                        this.paymoney = this.totalmoney*0.5;
                        this.endmoney = this.totalmoney*0.25;
                        this.threendmoney = this.totalmoney*0.25;
                    }
                }
            },
            immediate:true,
            deep:true
        }
    },
    methods: {
        addSales(){
            this.salesothlist.push({
                id:'',
                type:'',
                chinesename:'',
                ifsales:true
            });
        },
        delSale(index){
            // console.log(data);
            const arr = this.salesothlist;
            this.salesothlist.splice(index,1);
        },
        remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.mangerlist;
                    this.options = list.filter(item => item.chinesename.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options = [];
            }
        },
        changeSelete(data){
            const saleslist = this.mangerlist;
            const othsales = JSON.parse(JSON.stringify(this.salesothlist));
            let obj = null;
            saleslist.forEach(v=>{
                if(data.id==v.id){
                    obj = {
                        id:v.id,
                        type:'',
                        chinesename:v.chinesename,
                        ifsales:v.ifsales?true:false
                    };
                };
            });
            const newArr = othsales.map(item=>{
                if(item.id==obj.id){
                    item = obj;
                };
                return item;
            });
            this.salesothlist = newArr;
        },
        closeToast(e){
            // const dom = this.$refs.childMask;
            // if(dom){
            //     if(!dom.contains(e.target)){
            //         this.$emit('finsh','noend');
            //     }
            // }
            this.$emit('finsh','noend');
        },
        getDateVal(data){
            this.paytime = data;
        },
        getTowDate(data){
            this.nextpaytime = data;
        },
        getThreeDate(data){
            this.threenextpaytime = data;
        },
        getsalelist(){
            this.$https.getothsales({}).then(res=>{
                if(res&&res.code==200){
                    this.mangerlist = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        changeStatu(){
            this.isedit = true;
            this.$emit('changeContract',false);
            this.getDetail();
        },
        getDetail(){
            this.$https.getcontdetail({
                id:this.curtmentee.uid
            }).then(res=>{
                if(res&&res.code==200){
                    try{
                        this.curtmentee.id = res.data.id;
                        this.paytype = res.data.paytype;
                        setTimeout(()=>{
                            this.totalmoney = res.data.contractamount;
                        });
                        const arr = [];
                        if(res.data.othersales.length){
                            res.data.othersales.forEach(v=>{
                                arr.push({
                                    chinesename: v.chinesename,
                                    id: v.id,
                                    ifsales: v.ifsales?true:false,
                                    type: v.type
                                })
                            })
                        }
                        this.salesothlist = arr;
                        this.studenttype = res.data.level;
                        this.actualfrom = res.data.actualfrom;
                        this.comment = res.data.comment;
                        if(res.data.splitperiod==1){
                            this.paylx = '一期';
                            this.radioGp = '一期';
                            this.paymoney = res.data.period1.dueamount;
                            this.paytime = res.data.period1.duedate;
                        }else if(res.data.splitperiod==2){
                            this.paylx = '二期';
                            this.radioGp = '二期';
                            this.paymoney = res.data.period1.dueamount;
                            this.paytime = res.data.period1.duedate;
                            this.endmoney = res.data.period2.dueamount;
                            this.nextpaytime = res.data.period2.duedate;
                        }else if(res.data.splitperiod==3){
                            this.paylx = '三期';
                            this.radioGp = '三期';
                            this.paymoney = res.data.period1.dueamount;
                            this.paytime = res.data.period1.duedate;
                            this.endmoney = res.data.period2.dueamount;
                            this.nextpaytime = res.data.period2.duedate;
                            this.threendmoney = res.data.period3.dueamount;
                            this.threenextpaytime = res.data.period3.duedate;
                        };
                    }catch(e){}
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        goNext(){
            const paytype = this.paytype;
            const totalmoney = this.totalmoney;
            const paytime = this.paytime;
            const paymoney = this.paymoney;
            const radioGp = this.radioGp;
            const nextpaytime = this.nextpaytime;
            const endmoney = this.endmoney;
            const threenextpaytime = this.threenextpaytime;
            const threendmoney = this.threendmoney;
            const studenttype = this.studenttype;
            let flag = true;
            if(paytype==''||totalmoney==''||paytime==''||!studenttype){
                flag = false;
            };
            if(radioGp=='二期'){
                if(nextpaytime==''||endmoney==''){
                    flag = false;
                }
            };
            if(radioGp=='三期'){
                if(nextpaytime==''||endmoney==''||threenextpaytime==''||threendmoney==''){
                    flag = false;
                }
            };
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            const arr = this.salesothlist;
            let salesarr = [];
            arr.forEach(v=>{
                if(v.id){
                    salesarr.push(v);
                };
            });
            if(this.radioGp=='一期'){
                if(Number(this.paymoney)>Number(this.totalmoney)){
                    this.$Message.error('应收金额不能大于总金额，请检查后重新填写！');
                    return;
                };
            }else if(this.radioGp=='二期'){
                if(Number(this.paymoney)+Number(this.endmoney)>Number(this.totalmoney)){
                    this.$Message.error('应收金额不能大于总金额，请检查后重新填写！');
                    return;
                };
            }else if(this.radioGp=='三期'){
                if(Number(this.paymoney)+Number(this.endmoney)+Number(this.threendmoney)>Number(this.totalmoney)){
                    this.$Message.error('应收金额不能大于总金额，请检查后重新填写！');
                    return;
                };
            };
            if(Number(this.paymoney)+Number(this.endmoney)+Number(this.threendmoney)>Number(this.totalmoney)){
                this.$Message.error('应收金额不能大于总金额，请检查后重新填写！');
                return;
            };
            const params = {
                level:this.studenttype,
                splitperiod:this.radioGp=='一期'?1:this.radioGp=='二期'?2:this.radioGp=='三期'?3:'',
                duedate1:this.paytime,
                dueamount1:parseInt(this.paymoney),
                duedate2:this.nextpaytime,
                dueamount2:parseInt(this.endmoney),
                duedate3:this.threenextpaytime,
                dueamount3:parseInt(this.threendmoney),
                actualfrom:this.actualfrom,
                comment:this.comment
            };
            salesarr.forEach(item=>{
                if(!item.ifsales&&!item.type){
                    this.$Message.error('请填写完整再提交！');
                    return;
                };
            });
            if(salesarr.length){
                var obarr = JSON.parse(JSON.stringify(salesarr));
                obarr.forEach(v=>{
                    v.ifsales = v.ifsales?1:0
                });
                params.othersales = obarr;
            }else{
                params.othersales = ''
            };
            if(this.isedit){//编辑
                params.id = this.curtmentee.id;
                params.paytype = this.paytype;
                params.contractamount = parseInt(this.totalmoney);
                this.$https.editcontractinfo(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$emit('finsh','end');
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }else{//新增
                params.id = this.curtmentee.uid;
                params.paymenttype = this.paytype;
                params.totalamount = parseInt(this.totalmoney);
                this.$https.submitpayinfo(params).then(res=>{
                    if(res&&res.status=='success'){
                        this.$Message.success('操作成功！');
                        this.$emit('finsh','end');
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }
        }
    }
};
</script>

<style lang="scss">
#Contract{
    .blueIcon{
        color: #1665D8;
        cursor: pointer;
        font-size: 16px;
        vertical-align: middle;
        margin-left: 5px;
    }
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: rgba(55,55,55,.6);
    .htDetail{
        position: absolute;
        width: 388px;
        box-sizing: border-box;
        top:50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: #fff;
        border-radius: 4px;
        .ivu-modal-header{
            border-radius: 4px 4px 0 0;
            background-color: #fff;
            color: #3E3F42;
            font-size: 18px;
            padding: 21px 16px;
        }
        .headTile{
            border-radius: 4px 4px 0 0;
            background-color: #fff;
            color: #3E3F42;
            padding: 10px 20px;
            border-bottom: 1px solid #EEEFF0;
            position: relative;
            .rigtIcon{
                position: absolute;
                right: 10px;
                top: 8px;
                .editIcon{
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                .closeIcon{
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
        }
        .contBox{
            padding: 20px;
            .fqBox{
                margin-bottom: 140px!important;
            }
            .fqBox_1{
                margin-bottom: 200px!important;
            }
            .endBox{
                background-color: #ddd;
                padding: 16px;
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 148px;
                background-color: #ddd;
                >.sjx{
                    position: absolute;
                    width: 0;
                    top: -14px;
                    left: 25px;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 15px solid #ddd;
                }
            }
            .endBox_1{
                bottom: 210px;
                
            }
            .threeBox{
                padding: 0 16px 16px;
                bottom: 140px;
                >.sjx{
                    display: none;
                }
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                margin-bottom: 15px;
                >li{
                    flex: 1;
                    box-sizing: border-box;
                    &:first-of-type{
                        margin-right: 30px;
                        flex: none;
                        width: 100px;
                    }
                    .labTile{
                        font-weight: 400;
                        font-size: 14px;
                        margin-bottom: 10px;
                        color: #A3A3A3;
                    }
                    .tiletip{
                        font-size: 14px;
                        color: #A3A3A3;
                        margin-bottom: 5px;
                    }
                    .labCont{
                        font-size: 16px;
                        margin-top: 5px;
                        display: block;
                    }
                    .blueBtn{
                        color: #1665D8;
                        font-size: 12px;
                        font-weight: normal;
                        padding: 4px 8px;
                        border-radius: 4px;
                        background-color: #F5F6FA;
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
            .line{
                background-color: #eee;
                width: 100%;
                height: 1px;
                margin-bottom: 15px;
            }
            .tileTig{
                margin-top: 5px;
            }
            .saleBox{
                margin-top: 5px;
            }
            .suerBtn{
                width: 100px;
                margin: 0 auto;
                display: block;
                background-color: #1665D8;
                color: #fff;
                border: 1px solid #1665D8;
            }
            .tig{
                position: absolute;
                bottom: -32px;
                left: 50%;
                color: #fff;
                transform: translateX(-50%);
            }
        }
    }
    .selctBox{
        position: relative;
        .dataBox{
            position: absolute;
            top: 32px;
            left: 0;
            border: 1px solid #ddd;
            width: 74%;
            z-index: 2;
            background-color: #fff;           
            max-height: 160px;
            overflow-y: auto; 
            padding: 8px 20px 8px 10px;
            .ivu-checkbox-group-item{
                display: block;
                margin-right: 0;
                line-height: 30px;
            }
            .btnBox{
                text-align: right;
                button{
                    padding:2px 15px;
                    cursor: pointer;
                }
            }
        }
        button{
            display: inline-block;
            vertical-align: middle;
            padding: 5px 14px;
            border:1px solid #ddd;
            border-radius: 4px;
            margin-left: 10px;
            background-color: #fff;
        }

        .salesFlex{
            display: flex;
            margin-bottom: 10px;
            &:last-of-type{
                margin-bottom: 0;
            }
            >span{
                flex: 1;
                margin-right: 10px;
                &:last-of-type{
                    width:20px;
                    flex: none;
                    margin-right: 0;
                    text-align: right;
                    .ivu-icon{
                        font-size: 18px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-top: 6px;
                        cursor: pointer;
                        color: #E6492D;
                    }
                }
            }
        }
    }
    .dataInput{
        .spanItem{
            display: inline-block;
            background-color: #F5F6FA;
            padding: 4px 10px;
            border-radius: 4px;
            margin-right: 10px;
            b{
                margin-left: 10px;
                font-size: 17px;
                font-weight: 400;
                color: #1665D8;
                vertical-align: middle;
                cursor: pointer;
                display: inline-block;
            }
            &:last-of-type{
                margin-right: 0;
            }
        }
    }
}
</style>