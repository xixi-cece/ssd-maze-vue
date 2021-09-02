<template>
    <div id="Totalinfo">
        <div class="ltitem">
            <div class="cardbox">
                <h4 class="tilemsg">消息</h4>
                <ul class="listbox">
                    <li class="itemlist" v-for="(v,i) in msglist" :key="i">
                        <span class="linetxt">{{v.text}}</span>
                        <b class="time">{{v.time}}</b>
                    </li>
                </ul>
            </div>
            <div class="cardbox">
                <h4 class="tilemsg">
                    <span>待办事项</span>
                    <img src="../images/gray.png" class="addicon" @click="addModalbox">
                </h4>
                <ul class="listbox">
                    <draggable :list="thinglist" @change="log">
                        <li :class="['itemlist lithing',v.ishover?'blue':'']" v-for="(v,i) in thinglist" :key="i" @mousemove="changecolor(v)" @mouseleave="clearcolor">
                            <Icon v-if="v.ishover" :class="['dragicon',v.ishover?'blue':'']" custom="iconfont icontuozhuai" />
                            <Icon class="squaricon" type="ios-square-outline" />
                            <span class="linetxt">{{v.text}}</span>
                            <b :class="['time',v.ishover?'blue':'']">{{v.time}}</b>
                            <div class="moreicon">
                                <Dropdown trigger="click" :transfer="true" @on-click="changeObj($event,v)">
                                    <Icon :class="v.ishover?'blue':''" type="ios-more" />
                                    <DropdownMenu slot="list">
                                        <DropdownItem name='1'>修改</DropdownItem>
                                        <DropdownItem name='2'>删除</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </li>
                    </draggable>
                </ul>
            </div>
        </div>
        <div class="rtitem">
            <div class="cardbox">
                <h4 class="tilemsg">日历</h4>
                <div class="dateBox">
                    <DatePicker 
                    type="date"
                    :value='datetime'
                    @on-change="getDate"
                    placeholder="Select date"
                    ></DatePicker>
                </div>
                <div class="datethbox">
                    <h4 class="tilemsg" style="font-size:16px;">{{showdate}}</h4>
                    <div class="listbox">
                        <li class="itemlist datelist" v-for="(v,i) in thinglist" :key="i">
                            <Icon class="squaricon" type="ios-square-outline" />
                            <span class="linetxt">{{v.text}}</span>
                            <b class="time">{{v.time}}</b>
                        </li>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <Modal
            class="Editwork"
            v-model="chmodal"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>{{modalname}}</span>
                    <img class="close" src="../images/close.png" @click="clostModal">
                </div>
            </template>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">事项</span>
                    <Input v-model="dataInfo.workType" placeholder="请输入" style="width: 100%" />
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">时间</span>
                    <DatePicker type="date" :value="dataInfo.workDate" @on-change="seleDate" placeholder="选择日期" style="width: 100%"></DatePicker>
                </div>
            </div>
            <div class="btnBox">
                <Button class="button" @click="oksure">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name:'Totalinfo',
    data() {
        return {
            chmodal:false,
            modalname:'添加待办事项',
            msglist:[
                {
                    text:'你的文书导师品竹完成了UChicago的补充文书第100稿的修',
                    time:'7月25日'
                },
                {
                    text:'你的文书导师品竹完成了UChicago的补充文书第100稿的修',
                    time:'7月25日'
                },
                {
                    text:'你的文书导师品竹完成了UChicago的补充文书第100稿的修',
                    time:'7月25日'
                }
            ],
            thinglist:[
                {
                    text:'参加SAT考试',
                    time:'2020/09/16',
                    ishover:false
                },
                {
                    text:'参加SAT考试',
                    time:'2020/09/17',
                    ishover:false
                },
                {
                    text:'参加SAT考试',
                    time:'2020/09/18',
                    ishover:false
                }
            ],
            datetime:'',
            showdate:(new Date().getMonth()+1)+'月'+new Date().getDate()+'日',
            dataInfo:{}
        };
    },
    components: {
        draggable
    },
    watch: {

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        log(e){
            console.log(e)
        },
        changecolor(data){
            // console.log(data)
            const arr = this.thinglist;
            arr.forEach(v=>{
                v.ishover = false;
                if(v.ishover == data.ishover){
                    v.ishover = true;
                };
            });
            this.thinglist = arr;
        },
        clearcolor(){
            const arr = this.thinglist;
            arr.forEach(v=>{
                v.ishover = false;
            });
            this.thinglist = arr;
        },
        getDate(date){
            this.datetime = date;
            const seldate = new Date(date);
            this.showdate = (seldate.getMonth()+1)+'月'+seldate.getDate()+'日';
        },
        addModalbox(){
            this.chmodal = true;
            this.modalname = '添加待办事项';
            this.dataInfo = {};
        },
        seleDate(date){
            this.dataInfo.workDate = date;
        },
        changeObj(type,data){
            if(type==1){//修改
                this.chmodal = true;
                this.modalname = '修改待办事项';
                this.dataInfo = data;
            }else{
                this.$Modal.confirm({
                    title:'确认删除',
                    okText:'确认',
                    cancelText:'取消',
                    onOk:()=>{
                        
                    },
                    onCancel:()=>{}
                })
            };
        },
        clostModal(){
            this.chmodal = false;
        },
        oksure(){
            this.chmodal = false;
        }
    }
};
</script>

<style lang='scss'>
#Totalinfo{
    display: flex;
    min-height: 200px;
    .ltitem{
        flex: 60%;
    }
    .rtitem{
        flex: 40%;
        margin-left: 20px;
        .dateBox{
            border-bottom: 1px solid #ddd;
            .ivu-select-dropdown{
                position: relative!important;
                display: block!important;
            }
            .ivu-picker-panel-body-wrapper{
                overflow: hidden;
            }
            .ivu-date-picker-rel{
                display: none;
            }
            .ivu-select-dropdown{
                left: 0!important;
                top: 0!important;
                margin: 0!important;
                box-shadow: none!important;
                width: 100%;
                .ivu-date-picker-cells-header{
                    span{
                        width: 51px;
                    }
                }
                .ivu-picker-panel-body{
                    width: 100%;
                    .ivu-date-picker-cells{
                        width: 100%;
                        box-sizing: border-box;
                        margin: 0!important;
                        padding: 30px;
                        .ivu-date-picker-cells-cell{
                            width: 55px;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .datethbox{

        }
    }
    .cardbox{
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        .tilemsg{
            position: relative;
            height: 63px;
            line-height: 63px;
            padding-left: 24px;
            font-size: 18px;
            border-bottom: 1px solid #EAEDF3;
            .addicon{
                width: 22px;
                position: absolute;
                right: 24px;
                top:50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        }
        .listbox{
            .itemlist{
                position: relative;
                padding: 0 24px;
                line-height: 70px;
                height: 70px;
                border-bottom: 1px solid #EAEDF3;
                // list-style: inside;
                &:before{
                    position: absolute;
                    left: 24px;
                    top:50%;
                    transform: translateY(-50%);
                    content: '';
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background-color: #6759F3;
                }
                .linetxt{
                    font-size: 16px;
                    display: inline-block;
                    max-width: 86%;
                    margin-left: 20px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .time{
                    position: absolute;
                    right: 24px;
                    font-weight: normal;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 14px;
                    color: #9EA0A5;
                }
                .squaricon{
                    position: absolute;
                    left: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 20px;
                }
                .moreicon{
                    position: absolute;
                    right: 24px;
                    top: 50%;
                    z-index: 5;
                    transform: translateY(-50%);
                    font-size: 20px;
                    cursor: pointer;
                    color: #999;
                }
            }
            .lithing{
                cursor: move;
                &:before{
                    display: none;
                }
                .dragicon{
                    position: absolute;
                    font-size: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 4px;
                    color: #999;
                }
                .linetxt{
                    margin-left: 30px;
                }
                .time{
                    right: 54px;
                }
            }
            .datelist{
                &:before{
                    display: none;
                }
                .linetxt{
                    margin-left: 30px;
                }
            }
            .blue{
                color: #1665D8!important;
            }
        }
    }
}
// 弹窗
.Editwork{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        font-weight: 600;
        border-radius: 4px;
        padding: 21px 16px;
        .tilehead{
            color: #333;
            line-height: 15px;
            .close{
                float: right;
                cursor: pointer;
                margin-top: -4px;
                width: 24px;
                height: 24px;
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
                color: #b5b5b5;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .time{
                color: #515A6E;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
    .titletig{
      color: #b5b5b5;
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
        text-align: center;
        .button{
            border :none;
            width: 120px;
            height: 35px;
            background-color: #1665D8;
            color: #fff;
            margin-top: 20px;
        }
    }
}
</style>