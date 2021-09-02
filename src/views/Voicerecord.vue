<template>
    <div id="Voicerecord">
        <div class="wrapbox">
            <h3 class="headtip">
                <Icon type="ios-arrow-back" @click="goBack" />语音记录
                <span v-if="showtype!=3&&identity!='mentee'" class="btnbox">
                    <Button class="finshbtn" @click="finshBtn">完成</Button>
                    <Button class="cacebtn" @click="goBack">取消</Button>
                </span>
                <span class="btnbox" v-if="showtype==3&&identity!='mentee'">
                    <Button class="editbtn" @click="showtype=2" custom-icon="iconfont iconbianji1">编辑</Button>
                    <Button class="editbtn" @click="delInfo" custom-icon="iconfont iconshanchu1">删除</Button>
                </span>
            </h3>
            <div class="contBox">
                <div class="rowline">
                    <span class="labtile">学员姓名：</span>
                    <span>{{BaseInfo.menteename}}</span>
                </div>
                <div class="rowline">
                    <span class="labtile">语音日期：</span>
                    <span v-if="showtype==3"></span>
                    <DatePicker v-else type="date" :value="BaseInfo.date" @on-change="seleDate" placeholder="服务日期" style="width: 128px;"></DatePicker>
                </div>
                <div class="rowline">
                    <span class="labtile">语音时长：</span>
                    <span v-if="showtype==3"></span>
                    <Input v-else v-model="BaseInfo.serviceMinutes" style="width:50px;" />&nbsp;min
                </div>
                <div class="rowline">
                    <span class="labtile">参与人员：</span>
                    <span v-if="showtype==3" class="memberbox">
                        <span v-for="(v,i) in BaseInfo.participants" :key="i">
                            <Icon
                                :color="v=='行政导师'?'#4CB35C':v=='规划导师'?'#3E80DF':v=='文书导师'?'#F6AE36':v=='个性化导师'?'#6A5BF3':v=='专项导师'?'#A1CF1A':v=='学员家长'?'#D94C7B':''" 
                                :custom="v=='行政导师'?'iconfont iconhangzheng':v=='规划导师'?'iconfont iconguihua':v=='文书导师'?'iconfont iconwenshu':v=='个性化导师'?'iconfont icongexinghua':v=='专项导师'?'iconfont iconzhuanxiang':v=='学员家长'?'iconfont iconxueyuanjiachang':''"
                            />
                            <b>{{v}}</b>
                        </span>
                    </span>
                    <CheckboxGroup v-else v-model="BaseInfo.participants">
                        <Checkbox label="规划导师"></Checkbox>
                        <Checkbox label="文书导师"></Checkbox>
                        <Checkbox label="行政导师"></Checkbox>
                        <Checkbox label="个性化导师"></Checkbox>
                        <Checkbox label="专项导师"></Checkbox>
                        <Checkbox label="学员家长"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="rowline">
                    <span class="labtile">主导人员：</span>
                    <span v-if="showtype==3" class="memberbox">
                        <span v-for="(v,i) in BaseInfo.leading" :key="i">
                            <Icon
                                :color="v=='行政导师'?'#4CB35C':v=='规划导师'?'#3E80DF':v=='文书导师'?'#F6AE36':v=='个性化导师'?'#6A5BF3':v=='专项导师'?'#A1CF1A':v=='学员家长'?'#D94C7B':''" 
                                :custom="v=='行政导师'?'iconfont iconhangzheng':v=='规划导师'?'iconfont iconguihua':v=='文书导师'?'iconfont iconwenshu':v=='个性化导师'?'iconfont icongexinghua':v=='专项导师'?'iconfont iconzhuanxiang':v=='学员家长'?'iconfont iconxueyuanjiachang':''"
                            />
                            <b>{{v}}</b>
                        </span>
                    </span>
                    <CheckboxGroup v-else v-model="BaseInfo.leading">
                        <Checkbox label="规划导师"></Checkbox>
                        <Checkbox label="文书导师"></Checkbox>
                        <Checkbox label="行政导师"></Checkbox>
                        <Checkbox label="个性化导师"></Checkbox>
                    </CheckboxGroup>
                </div>
                <Divider />
                <div class="rowline">
                    <span class="labtile" style="width:120px;margin-bottom:5px;">学员现有信息</span>
                    <div ref="editorElem" :class="showtype!=3?'editorbox':'lookInfo'" style="text-align:left;"></div>
                </div>
                <div class="rowline">
                    <span class="labtile" style="width:120px;margin-bottom:5px;">导师的comments</span>
                    <div ref="mentorE" :class="showtype!=3?'editorbox':'lookInfo'" style="text-align:left;"></div>
                </div>
                <div class="rowline">
                    <span class="labtile" style="width:120px;margin-bottom:5px;">近期待办事项<Icon v-if="showtype==1||showtype==2" @click="addItem" style="color:#1665D8;margin-left:5px;cursor:pointer;font-size:18px;" type="ios-add-circle-outline" /></span>
                    <div class="labBox" v-if="showtype==3">
                        <CheckboxGroup v-model="BaseInfo.recentEvent" v-if="showtype==3">
                            <Checkbox v-for="(item,j) in BaseInfo.recentEvent" :key="j" :label="item"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="labBox" v-else>
                        <Input v-if="valcont||showipt" v-model="valcont" style="width:250px;" @on-blur="getIptval(valcont)"/>
                        <div class="rowlab" v-for="(item,j) in BaseInfo.recentEvent" :key="j">{{item}}<Icon class="closeIcon" @click="delItem(j)" type="md-close" /></div>
                    </div>
                </div>
                <div class="rowline">
                    <span class="labtile" style="width:120px;margin-bottom:5px;">远期待办事项<Icon v-if="showtype==1||showtype==2" @click="addYqsx" style="color:#1665D8;margin-left:5px;cursor:pointer;font-size:18px;" type="ios-add-circle-outline" /></span>
                    <div class="labBox" v-if="showtype==3">
                        <CheckboxGroup v-model="BaseInfo.futureEvent" v-if="showtype==3">
                            <Checkbox v-for="(ivm,k) in BaseInfo.futureEvent" :key="k" :label="ivm"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="labBox" v-else>
                        <Input v-if="yciptval||showyqipt" v-model="yciptval" style="width:250px;" @on-blur="getycIpt(yciptval)"/>
                        <div class="rowlab" v-for="(ivm,k) in BaseInfo.futureEvent" :key="k">{{ivm}}<Icon class="closeIcon" @click="delYcitm(k)" type="md-close" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../assets/lib/config';
import E from 'wangeditor';

export default {
    name:'Voicerecord',
    data() {
        return {
            showtype:1,//展示类型
            studenteditor:null,
            teacheditor:null,
            showipt:false,//近期待办事项
            valcont:'',
            showyqipt:false,//远期待办事项
            yciptval:'',
            identity:'',//用户身份
            BaseInfo:{}
        };
    },
    components: {
        
    },
    watch: {

    },
    computed: {

    },
    created() {
        this.identity = sessionStorage.getItem('logintype');
    },
    mounted() {
        const querys = this.$route.query;
        this.showtype = querys.type;
        this.BaseInfo = JSON.parse(querys.datainfo);
        //初始化富文本编辑器
        this.initeditor();
        this.initmentor();
        if(querys.type==1){//添加
            
        }else if(querys.type==2){//编辑
            this.studenteditor.txt.html(this.BaseInfo.studentInfo);
            this.teacheditor.txt.html(this.BaseInfo.mentorComments);
        }else if(querys.type==3){//查看
            this.studenteditor.txt.html(this.BaseInfo.studentInfo);
            this.teacheditor.txt.html(this.BaseInfo.mentorComments);
        };
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        delInfo(){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delrecord({
                        id:this.BaseInfo.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.$router.go(-1);
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{}
            })
        },
        seleDate(date){
            this.BaseInfo.date = date;
        },
        addItem(){
            this.showipt=true;
        },
        getIptval(data){
            // console.log(data);
            if(!data)return;
            this.BaseInfo.recentEvent.push(data);
            this.showipt = false;
            this.valcont = '';
        },
        delItem(index){
            this.BaseInfo.recentEvent.splice(index,1);
        },
        addYqsx(){
            this.showyqipt=true;
        },
        getycIpt(data){
            if(!data)return;
            this.BaseInfo.futureEvent.push(data);
            this.showyqipt = false;
            this.yciptval = '';
        },
        delYcitm(index){
            this.BaseInfo.futureEvent.splice(index,1);
        },
        goBack(){
            this.$router.go(-1);
        },
        isNull(){
            const date = this.BaseInfo.date;
            const serviceMinutes = this.BaseInfo.serviceMinutes;
            const participants = this.BaseInfo.participants.length;
            const leading = this.BaseInfo.leading.length;
            const studentInfo = this.BaseInfo.studentInfo;
            const mentorComments = this.BaseInfo.mentorComments;
            const recentEvent = this.BaseInfo.recentEvent.length;
            const futureEvent = this.BaseInfo.futureEvent.length;
            if(!date||!serviceMinutes||!participants||!leading||!studentInfo||!mentorComments||!recentEvent||!futureEvent){
                return false;
            };
            return true;
        },
        finshBtn(){
            const flag = this.isNull();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            const params = {
                recordType:'audio_record',
                menteeName:this.BaseInfo.mentusname,
                date:this.BaseInfo.date,
                serviceMinutes:this.BaseInfo.serviceMinutes,
                participants:this.BaseInfo.participants,
                leading:this.BaseInfo.leading,
                studentInfo:this.BaseInfo.studentInfo,
                mentorComments:this.BaseInfo.mentorComments,
                recentEvent:this.BaseInfo.recentEvent,
                futureEvent:this.BaseInfo.futureEvent
            };
            // console.log(params);
            if(this.showtype==1){//添加
                this.$https.addrecord(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                });
            }else if(this.showtype==2){//编辑
                params.id = this.BaseInfo.id;
                this.$https.editrecord(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                });
            };
        },
        initeditor(){
            const _this = this;
            this.studenteditor = new E(this.$refs.editorElem);
            if(this.showtype==3){//查看
                //菜单配置
                this.studenteditor.customConfig.menus = [];
                this.studenteditor.create(); // 创建富文本实例
                // 禁用编辑功能
                this.studenteditor.$textElem.attr('contenteditable', false)
            }else{
                // 编辑器的事件，每次改变会获取其html内容
                this.studenteditor.customConfig.onchange = html => {
                    this.BaseInfo.studentInfo = html;
                };
                this.studenteditor.customConfig.menus = [
                    // 菜单配置
                    'head', // 标题
                    'bold', // 粗体
                    'fontSize', // 字号
                    'fontName', // 字体
                    'italic', // 斜体
                    'underline', // 下划线
                    'strikeThrough', // 删除线
                    'foreColor', // 文字颜色
                    'backColor', // 背景颜色
                    'link', // 插入链接
                    'list', // 列表
                    'justify', // 对齐方式
                    'quote', // 引用
                    'image', // 插入图片
                    // 'emoticon', // 表情
                    // 'table', // 表格
                    // 'code', // 插入代码
                    // 'undo', // 撤销
                    // 'redo' // 重复
                ];
                this.studenteditor.customConfig.uploadImgServer = config.http_url+'/upload_photo';
                this.studenteditor.customConfig.uploadImgParams={
                    'type':'article'
                };
                this.studenteditor.customConfig.uploadImgHeaders = {
                    'token': sessionStorage.getItem('token')
                };
                this.studenteditor.customConfig.uploadFileName = 'file';
                this.studenteditor.customConfig.showLinkImg = false;//隐藏网络图片
                this.studenteditor.customConfig.uploadImgHooks = {
                    before: function (xhr, studenteditor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst studenteditor 是编辑器对象，files 是选择的图片文件
                        
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                        // console.log(files);
                    },
                    success: function (xhr, studenteditor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst studenteditor 是编辑器对象，result 是服务器端返回的结果
                        _this.studenteditor.txt.append('<img style="max-width:100%;" src="'+result.data[0]+'"/>');
                        _this.BaseInfo.studentInfo = _this.studenteditor.txt.editor.$textElem[0].innerHTML;
                    },
                    fail: function (xhr, studenteditor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst studenteditor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, studenteditor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst studenteditor 是编辑器对象
                    },
                    timeout: function (xhr, studenteditor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst studenteditor 是编辑器对象
                    },
                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, studenteditor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，studenteditor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        // var url = result.url
                        // insertImg(url)
                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                };
                this.studenteditor.create(); // 创建富文本实例
            }
        },
        initmentor(){
            const _this = this;
            this.teacheditor = new E(this.$refs.mentorE);
            if(this.showtype==3){//查看
                //菜单配置
                this.teacheditor.customConfig.menus = [];
                this.teacheditor.create(); // 创建富文本实例
                // 禁用编辑功能
                this.teacheditor.$textElem.attr('contenteditable', false)
            }else{
                // 编辑器的事件，每次改变会获取其html内容
                this.teacheditor.customConfig.onchange = html => {
                    this.BaseInfo.mentorComments = html;
                };
                this.teacheditor.customConfig.menus = [
                    // 菜单配置
                    'head', // 标题
                    'bold', // 粗体
                    'fontSize', // 字号
                    'fontName', // 字体
                    'italic', // 斜体
                    'underline', // 下划线
                    'strikeThrough', // 删除线
                    'foreColor', // 文字颜色
                    'backColor', // 背景颜色
                    'link', // 插入链接
                    'list', // 列表
                    'justify', // 对齐方式
                    'quote', // 引用
                    'image', // 插入图片
                    // 'emoticon', // 表情
                    // 'table', // 表格
                    // 'code', // 插入代码
                    // 'undo', // 撤销
                    // 'redo' // 重复
                ];
                this.teacheditor.customConfig.uploadImgServer = config.http_url+'/upload_photo';
                this.teacheditor.customConfig.uploadImgParams={
                    'type':'article'
                };
                this.teacheditor.customConfig.uploadImgHeaders = {
                    'token': sessionStorage.getItem('token')
                };
                this.teacheditor.customConfig.uploadFileName = 'file';
                this.teacheditor.customConfig.showLinkImg = false;//隐藏网络图片
                this.teacheditor.customConfig.uploadImgHooks = {
                    before: function (xhr, teacheditor, files) {
                        // 图片上传之前触发
                        // xhr 是 XMLHttpRequst 对象，teacheditor 是编辑器对象，files 是选择的图片文件
                        
                        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                        // return {
                        //     prevent: true,
                        //     msg: '放弃上传'
                        // }
                        // console.log(files);
                    },
                    success: function (xhr, teacheditor, result) {
                        // 图片上传并返回结果，图片插入成功之后触发
                        // xhr 是 XMLHttpRequst 对象，teacheditor 是编辑器对象，result 是服务器端返回的结果
                        _this.teacheditor.txt.append('<img style="max-width:100%;" src="'+result.data[0]+'"/>');
                        _this.BaseInfo.mentorComments = _this.teacheditor.txt.editor.$textElem[0].innerHTML;
                    },
                    fail: function (xhr, teacheditor, result) {
                        // 图片上传并返回结果，但图片插入错误时触发
                        // xhr 是 XMLHttpRequst 对象，teacheditor 是编辑器对象，result 是服务器端返回的结果
                    },
                    error: function (xhr, teacheditor) {
                        // 图片上传出错时触发
                        // xhr 是 XMLHttpRequst 对象，teacheditor 是编辑器对象
                    },
                    timeout: function (xhr, teacheditor) {
                        // 图片上传超时时触发
                        // xhr 是 XMLHttpRequst 对象，teacheditor 是编辑器对象
                    },
                    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                    customInsert: function (insertImg, result, teacheditor) {
                        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                        // insertImg 是插入图片的函数，teacheditor 是编辑器对象，result 是服务器端返回的结果

                        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                        // var url = result.url
                        // insertImg(url)
                        // result 必须是一个 JSON 格式字符串！！！否则报错
                    }
                };
                this.teacheditor.create(); // 创建富文本实例
            };
        }
    }
};
</script>

<style lang='scss'>
#Voicerecord{
    .wrapbox{
        border: 1px solid #EAEDF3;
        box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
        border-radius:4px;
        background-color: #fff;
        .headtip {
            position: relative;
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
            .btnbox{
                position: absolute;
                right: 30px;
                top: 50%;
                transform: translateY(-50%);
                .finshbtn{
                    background-color: #1665D8;
                    margin-right: 20px;
                    color: #fff;
                }
                .cacebtn{
                    background-color: #6B6C6F;
                    color: #fff;
                }
                .editbtn{
                    border:none;
                    padding: 0;
                    .ivu-icon{
                        margin: 0;
                        font-size: 20px;
                        vertical-align: middle;
                        display: inline-block;
                        margin-top: -2px;
                    }
                    margin-right: 15px;
                    &:last-of-type{
                        margin-right: 0;
                    }
                }
            }
        }
        .contBox {
            padding: 30px 174px;
            .rowline{
                margin-bottom: 20px;
                &:last-of-type{
                    margin-bottom: 0;
                }
                .labtile{
                    font-size: 14px;
                    font-weight: 600;
                    width: 75px;
                    display: inline-block;
                }
                .ivu-input{
                    height: 28px;
                }
                .ivu-checkbox-group{
                    display: inline-block;
                    .ivu-checkbox-focus{
                        box-shadow: none;
                    }
                }
                .editorbox{
                    .w-e-toolbar{
                        border: 0!important;
                        background-color: #fff!important;
                        padding: 0;
                        .w-e-menu{
                            padding: 5px 0;
                            margin-right: 15px;
                            i{
                                color: #6B6C6F;
                                &:hover{
                                    color: #1665D8;
                                }
                            }
                        }
                    }
                    .w-e-text-container{
                        border: 1px solid #E3E5ED!important;
                        height: 100px!important;
                        box-shadow:0px 1px 2px 0px rgba(102,113,123,0.21);
                        border-radius:4px;
                    }
                    .w-e-text{
                        overflow-y: auto!important;
                    }
                }
                .lookInfo{
                    .w-e-toolbar{
                        display: none;
                    }
                    .w-e-text-container{
                        border: none!important;
                    }
                    .w-e-text{
                        overflow: hidden;
                    }
                    .w-e-text-container{
                        height: auto!important;
                    }
                }
                .memberbox{
                    >span{
                        display: inline-block;
                        padding: 4px 10px;
                        border: 1px solid #EAEDF3;
                        margin-right: 8px;
                        border-radius: 4px;
                        &:last-of-type{
                            margin-right: 0;
                        }
                        >.ivu-icon{
                            font-size: 20px;
                            margin-right: 5px;
                        }
                        >b{
                            font-weight: normal;
                        }
                    }
                }
                .labBox{
                    .rowlab{
                        padding: 5px 0;
                        .closeIcon{
                            color:#E6492D;
                            font-size:18px;
                            margin-left:5px;
                            cursor: pointer;
                        }
                    }
                    .ivu-checkbox-group-item{
                        display: block;
                        margin-bottom: 10px;
                        &:last-of-type{
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>