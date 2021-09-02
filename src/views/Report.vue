<template>
  <div id="Report">
    <div class="topTab">
      <h3 class="title">工时提交</h3>
      <div class="workBox clearfix">
        <div class="squar">
          <div class="row_line">
            <span class="tigname">工作类型</span>
            <Select v-model="workType" @on-change="getVal" style="width:100%">
              <Option v-for="item in workList" :value="item.label" :key="item.label">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="row_line">
            <span class="tigname">开始时间</span>
            <TimePicker format="HH:mm" v-model="startTime" @on-change="seleTime" placeholder="选择时间" style="width: 100%"></TimePicker>
          </div>
        </div>
        <div class="squar">
          <div class="row_line">
            <span class="tigname">选择学员</span>
            <Select  
              v-model="menteeId"
              placeholder="请输入姓名查询"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width:100%;"
            >
              <Option v-for="(item,i) in menteeList" :value="item.menteeId" :key="i">{{ item.chineseName }}</Option>
            </Select>
          </div>
          <div class="row_line">
            <span class="tigname">结束时间</span>
            <TimePicker format="HH:mm" v-model="endTime" @on-change="seleEdtime" placeholder="选择时间" style="width: 100%"></TimePicker>
          </div>
        </div>
        <div class="squar">
          <div class="row_line">
            <span class="tigname">工作日期</span>
            <DatePicker type="date" :value="workDate" @on-change="seleDate" placeholder="选择日期" style="width: 100%"></DatePicker>
          </div>
          <div class="row_line">
            <span class="tigname">工作时长</span>
            <span class="time">{{workHours}}</span>
          </div>
        </div>
        <div class="squar">
          <h4 class="titletig">具体工作内容</h4>
          <Input style="height:100%;" v-model="workContent" type="textarea" placeholder="请输入" />
        </div>
        <div class="squar">
          <Button type="success" class="subtn" @click="submitData" :disabled="disabled">确认提交</Button>
        </div>
      </div>
    </div>
    <div class="tableBox">
        <div class="tigrow">当月已提交</div>
        <Table :columns="columns" :data="data">
          <template slot-scope="{row}" slot="menteeName">
            <span style="color:#1665D8;">{{row.workType=='专项'?row.workType:row.menteeName}}</span>
          </template>
          <!-- <template slot-scope="{row}" slot="action">
            <Button class="btncorl" type="primary" size="small" style="margin-right: 10px" @click="editModal(row)">修改</Button>
            <Button class="btncorl" type="error" size="small" @click.stop="showDel=true">删除</Button>
          </template> -->
          <template slot-scope="{row}" slot="option">
            <Poptip
              :transfer="true"
              placement="bottom"
              :width='80'
              popper-class='poptip'
            >
              <Icon class="iconopt" custom="iconfont icongengduo" />
              <ul slot='content'>
                <li :class="['litem',itm.ischeck?'gray':'']" v-for="(itm,j) in options" @click.stop="closepop(itm,row)" :key="j">{{itm.val}}</li>
              </ul>
            </Poptip>
          </template>
        </Table>
    </div>
    <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
    <changemodal :chmodal="showModal" :dataObj="selInfo" @closestatu="changeModal(arguments)"></changemodal>
    <delmodal :delmodal="showDel" :dataObj="selInfo" @delstatu="delModal"></delmodal>
  </div>
</template>

<script>
import Changemodal from '../components/Changemodal';
import Delmodal from '../components/Delmodal';
import { utility } from '../assets/lib/common';

export default {
  name: 'Report',
  components: {
    Changemodal,
    Delmodal
  },
  data(){
    return{
      disabled:false,
      workList:[
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
        }
      ],
      loading:false,
      seloption:[],//临时选择的项
      menteeList:[],
      selInfo:{},
      id:'',
      menteeId:'',
      workType:'',
      workDate:'',
      startTime:'00:00',
      endTime:'00:00',
      workHours:'0',
      minuteTime:0,
      workContent:'',
      showModal:false,
      showDel:false,
      options:[
        {
          val:'编辑',
          ischeck:false
        },
        {
          val:'删除',
          ischeck:false
        }
      ],
      columns:[
        {
          title: '工作类型',
          minWidth:100,
          key: 'workType'
        },
        {
          title: '学员姓名',
          minWidth:120,
          sortable: true,
          slot: 'menteeName'
        },
        {
          title: '具体工作内容',
          minWidth:180,
          tooltip:true,
          key: 'workContent'
        },
        {
          title: '工作日期',
          minWidth:130,
          sortable: true,
          key: 'workDate'
        },
        {
          title: '开始时间',
          minWidth:120,
          sortable: true,
          key: 'startTime'
        },
        {
          title: '结束时间',
          minWidth:120,
          sortable: true,
          key: 'endTime'
        },
        {
          title: '工作时长',
          sortable: true,
          tooltip:true,
          minWidth:120,
          key: 'workHours'
        },
        {
          title: '提交日期',
          minWidth:130,
          sortable: true,
          key: 'createDate'
        },
        {
          title: ' ',
          slot: 'option',
          minWidth: 80,
          align: 'center'
        }
      ],
      totalpage:0,
      pageSize:10,
      currentpage:1,
      data:[
        // {
        //   workType:'咨询'
        // }
      ]
    }
  },
  mounted(){
    this.getData();
    this.getstudentlist();
  },
  methods:{
    getcurtpage(data){
      this.currentpage = data;
      this.getData();
    },
    getshowpage(data){
      this.pageSize = data;
      if(this.currentpage!=1){
        this.currentpage = 1;
      }else{
        this.getData();
      };
    },
    closepop(opt,data){
      // console.log(data)
      this.selInfo = data;
      this.id = data.id;
      let arr = this.options;
      arr.forEach(v=>{
        v.ischeck = false;
        if(opt.val==v.val){
          v.ischeck = true;
        };
      });
      this.options = arr;
      if(opt.val=='编辑'){
        this.showModal = true;
      }else if(opt.val=='删除'){
        this.showDel = true;
      };
    },
    getVal(data){
      if(data=='专项'){
        this.menteeId='';
      }
    },
    changeModal(data){
      const status = data[0];
      const params = data[1];
      if(status==1){
        this.editTime(params);
      }else{
        this.showModal = false;
      }
    },
    editModal(data){
      this.selInfo = data;
      this.showModal = true;
      this.id = data.id;
    },
    delModal(data){
      this.showDel = false;
      if(data==1){//删除
        this.$https.delTime({
          id:this.id
        }).then(res=>{
          if(res&&res.code==200){
            this.$Message.success('操作成功！');
            this.getData();
          }else{
            this.$Message.error('操作失败！');
          }
        })
      };
    },
    seleDate(data){
      this.workDate = data;
    },
    seleTime(data){
      this.startTime = data;
      this.endTime = "00:00";
      this.workHours = 0;
      this.minuteTime = 0;
    },
    seleEdtime(data){
      let fintime = '';
      let hour = 0;
      let minute = 0;
      const s_time = this.startTime.split(':');
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
      //   this.$Message.error('结束时间不能小于开始时间！');
      //   this.endTime = '00:00';
      //   return;
      // }
      // if(e_time[0]-s_time[0]>0){
      //   fintime = e_time[0]-s_time[0] + '小时';
      //   hour = e_time[0]-s_time[0];
      // };
      // if(e_time[1]-s_time[1]>0){
      //   fintime = fintime + (e_time[1]-s_time[1] + '分钟')
      //   minute = e_time[1]-s_time[1];
      // };
      // console.log(fintime)
      this.endTime = data;
      this.minuteTime = hour*60 + minute;
      this.workHours = minute>0?(hour+'小时'+minute+'分钟'):hour+'小时';
    },
    isNull(){
      const workType = this.workType;
      const menteeId = this.menteeId;
      const workDate = this.workDate;
      const startTime = this.startTime;
      const endTime = this.endTime;
      const minuteTime = this.minuteTime;
      const workContent = this.workContent;
      if((workType!='专项'&&!menteeId)||!workDate||!startTime||!endTime||!minuteTime||!workContent){
        return false;
      }
      return true;
    },
    submitData(){
      const flag = this.isNull();
      if(!flag){
        this.$Message.error('请填写完整再提交！');
        return;
      };
      this.disabled = true;
      this.$https.addworkTime({
        menteeId:this.menteeId,
        workType:this.workType,
        workDate:this.workDate,
        startTime:this.startTime,
        endTime:this.endTime,
        workHours:this.minuteTime,
        workContent:this.workContent
      }).then(res=>{
        this.disabled = false;
        if(res&&res.code==200){
          this.$Message.success('提交成功！');
          this.workType = "";
          this.menteeId = "";
          this.workDate = "";
          this.startTime = "00:00";
          this.endTime = "00:00";
          this.workHours = 0;
          this.minuteTime = 0;
          this.workContent = "";
          this.getData();
        }else{
          this.$Message.error(res.msg);
        };
      });
    },
    getData(){
      this.$https.lookWorks({
        year:new Date().getFullYear(),
        page:this.currentpage,
        pageSize:this.pageSize
      }).then(res=>{
        if(res&&res.code==200){
          const arr = res.data.list;
          arr.forEach(item=>{
            item.workDate = utility.framateDate(item.workDate);
            item.createDate = utility.framateDate(item.createDate);
            const mintime = item.workHours;
            item.minuteTime = mintime;
            item.workHours = mintime%60>0?(Math.floor(mintime/60)+'小时'+mintime%60+'分钟'):Math.floor(mintime/60)+'小时';
          });
          this.totalpage = res.data.count;
          this.data = arr;
        }else{
          this.$Message.error(res.msg);
        };
      })
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
    editTime(data){
      if(!data.workType||(data.workType!='专项'&&!data.menteeId)||!data.workDate||!data.startTime||!data.endTime||!data.minuteTime||!data.workContent){
        this.$Message.error('请填写完整再保存！');
        return;
      };
      this.showModal = false;
      this.$https.editWorktime({
        id:data.id,
        menteeId:data.menteeId,
        workType:data.workType,
        workDate:data.workDate,
        startTime:data.startTime,
        endTime:data.endTime,
        workHours:data.minuteTime,
        workContent:data.workContent
      }).then(res=>{
        if(res&&res.code==200){
          this.$Message.success('修改成功！');
          this.getData();
        }else{
          this.$Message.error(res.msg);
        }
      })
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
}
</script>

<style lang="scss">
.btm_page{
  text-align: center;
  padding: 15px 0;
}
#Report{
  .topTab{
    border-radius: 3px;
    background-color: #fff;
    .title{
      color:#3E3F42;
      border-bottom: 1px solid #E8EAEC;
      font-size: 18px;
      font-weight: 600;
      padding: 10px 15px;
    }
    .ivu-input{
      color:#3E3F42;
    }
    .workBox{
      padding: 0 15px 20px;
      position: relative;
      .squar{
        float: left;
        margin-right: 30px;
        .row_line{
          width: 154px;
          .tigname{
            display: block;
            color: #9ea0a5;
            height: 40px;
            line-height: 40px;
            width: 100%;
          }
          .mentbe{
            display: block;
            height: 30px;
            line-height: 30px;
            margin-bottom: 2px;
          }
        }
        .titletig{
          color: #9ea0a5;
          font-weight: normal;
          line-height: 35px;
          height: 35px;
        }
        textarea{
          width: 406px;
          height: 108px;
          resize: none;
        }
        .subtn{
          position: absolute;
          bottom: 22px;
          width: 100px;
          background-color: #1665D8;
          border-color: #1665D8;
        }
      }
    }
  }
  .tigrow{
    font-weight: 600;
    font-size: 18px;
    padding: 10px 0;
    padding-left: 18px;
    border-bottom: 1px solid #ddd;
  }
  .tableBox{
    border-radius: 4px;
    overflow: hidden;
    margin-top: 20px;
    background-color: #fff;
    .ivu-table th{
      background-color: #fff;
      font-weight: 400;
      color: #B0B0B0;
    }
    .ivu-table td{
      font-size: 16px;
    }
    .typeBtn{
      background-color: #ECECEC;
      color: #939393;
      border-radius: 4px;
      display: inline-block;
      padding: 4px 10px;
      .ivu-icon {
        font-size: 24px;
      }
    }
    .btncorl{
      border:none;
      font-size: 13px;
      background-color: #346298;
      &:last-of-type{
        background-color: #F3BF1D;
      }
    }
  }
}
.iconopt{
  opacity: .4;
  cursor: pointer;
}
.poptip{
  min-width: 90px;
  text-align: center;
  z-index: 9!important;
  .ivu-poptip-body{
    padding: 10px 0;
  }
  .litem{
    padding: 4px 0;
    cursor: pointer;
  }
  .gray{
    background-color: #ddd;
  }
}
</style>