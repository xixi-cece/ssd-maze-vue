<template>
  <div id="Writetime">
    <div class="topTab">
      <h3 class="title">填报工时</h3>
      <div class="workBox clearfix">
        <div class="squar">
          <div class="row_line">
            <span class="tigname">监督人</span>
            <Select 
              v-model="superVisorId"
              placeholder="请输入姓名查询"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width:100%"
            >
              <Option v-for="item in peoList" :value="item.superVisorId" :key="item.superVisorId">{{ item.chinesename }}</Option>
            </Select>
          </div>
          <div class="row_line">
            <span class="tigname">开始时间</span>
            <TimePicker format="HH:mm" v-model="startTime" @on-change="starTime" placeholder="选择时间" style="width: 100%"></TimePicker>
          </div>
        </div>
        <div class="squar">
          <div class="row_line">
            <span class="tigname">工作名称</span>
            <Input v-model="workType" placeholder="请输入" style="width: 100%" />
          </div>
          <div class="row_line">
            <span class="tigname">结束时间</span>
            <TimePicker format="HH:mm" v-model="endTime" @on-change="chandTime" placeholder="选择时间" style="width: 100%"></TimePicker>
          </div>
        </div>
        <div class="squar">
          <div class="row_line">
            <span class="tigname">工作日期</span>
            <DatePicker type="date" :value="workDate" @on-change="selDate" placeholder="选择日期" style="width: 100%"></DatePicker>
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
          <Button type="success" class="subtn" @click="addInfo" :disabled="disabled">确认提交</Button>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <div class="tigrow">当月已提交</div>
      <Table :columns="columns" :data="data">
        <template slot-scope="{row}" slot="superVisorName">
          <span style="color:#1665D8;cursor:pointer;">{{row.superVisorName}}</span>
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
              <li :class="['litem',itm.ischeck?'gray':'']" v-for="itm in options" @click.stop="closepop(itm,row)" :key="itm.val">{{itm.val}}</li>
            </ul>
          </Poptip>
        </template>
      </Table>
    </div>
    <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
    <editwork :chmodal="showModal" :dataObj='dataInfo' @closestatu="changeModal(arguments)"></editwork>
    <delmod :delmodal="showDel" :dataObj='dataInfo' @delstatu="delModal"></delmod>
  </div>
</template>

<script>
import Editwork from '../components/Editwork';
import Delmod from '../components/Delmod';
import { utility } from '../assets/lib/common.js';

export default {
  name: 'Writetime',
  components: {
    Editwork,
    Delmod
  },
  data(){
    return{
      disabled:false,
      loading:false,
      seloption:[],//临时选择的项
      peoList:[],
      dataInfo:{},//当前修改的项
      superVisorId:'',
      workType:'',
      workDate:'',
      startTime:'00:00',
      endTime:'00:00',
      minuteTime:0,
      workHours:'0',
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
          title: '监督人',
          minWidth:100,
          slot: 'superVisorName'
        },
        {
          title: '工作名称',
          minWidth:120,
          tooltip:true,
          align:'left',
          key: 'workType'
        },
        {
          title: '具体工作内容',
          align:'left',
          tooltip:true,
          minWidth:120,
          key: 'workContent'
        },
        {
          title: '工作日期',
          minWidth:130,
          align:'left',
          sortable: true,
          key: 'workDate'
        },
        {
          title: '开始时间',
          minWidth:100,
          align:'left',
          key: 'startTime'
        },
        {
          title: '结束时间',
          minWidth:100,
          align:'left',
          key: 'endTime'
        },
        {
          title: '工作时长',
          minWidth:120,
          tooltip:true,
          align:'left',
          key: 'workHours'
        },
        {
          title: '提交日期',
          minWidth:120,
          sortable: true,
          align:'left',
          key: 'createDate'
        },
        {
          title: ' ',
          slot: 'option',
          minWidth: 50,
          align: 'center'
        }
      ],
      data:[],
      totalpage:0,
      pageSize:10,
      currentpage:1
    }
  },
  mounted(){
    this.getsupdata();
    setTimeout(()=>{
      this.getData();
    },200)
  },
  methods:{
    closepop(opt,data){
      this.dataInfo = data;
      this.menteeId = data.id;
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
    changeModal(data){
      // console.log(status)
      // console.log(data)
      const status = data[0];
      const params = data[1];
      if(status==1){
        this.editInfo(params);
      }else{
        this.showModal = false;
      }
    },
    // editModal(data){
    //   this.showModal = true;
    //   this.dataInfo = data;
    // },
    delModal(data){
      this.showDel = false;
      if(data==1){
        this.$https.delmenTime({
          id:this.menteeId
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
    isNull(){
      const superVisorId = this.superVisorId;
      const workType = this.workType;
      const workDate = this.workDate;
      const startTime = this.startTime;
      const endTime = this.endTime;
      const minuteTime = this.minuteTime;
      const workContent = this.workContent;
      if(!superVisorId||!workType||!workDate||!startTime||!endTime||!minuteTime||!workContent){
        return false;
      }
      return true;
    },
    addInfo(){
      const flag = this.isNull();
      if(!flag){
        this.$Message.error('请填写完整再提交！');
        return;
      };
      this.showModal = false;
      this.disabled = true;
      this.$https.addIntetime({
        superVisorId:this.superVisorId,
        workType:this.workType,
        workDate:this.workDate,
        startTime:this.startTime,
        endTime:this.endTime,
        workHours:this.minuteTime,
        workContent:this.workContent
      }).then(res=>{
        this.disabled = false;
        if(res&&res.code==200){
          this.$Message.success('操作成功！');
          this.superVisorId = '';
          this.workType = '';
          this.workDate = '';
          this.startTime = '00:00';
          this.endTime = '00:00';
          this.workHours = 0;
          this.minuteTime = 0;
          this.workContent = '';
          this.getData();
        }else{
          this.$Message.error(res.msg);
        }
      })
    },
    selDate(data){
      this.workDate = data;
    },
    starTime(data){
      this.startTime = data;
      this.endTime = '00:00';
      this.workHours = 0;
      this.minuteTime = 0;
    },
    chandTime(data){
      // console.log(data);
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
      // };
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
    getshowpage(data){
      this.pageSize = data;
      if(this.currentpage!=1){
        this.currentpage = 1;
      }else{
        this.getData();
      };
    },
    getcurtpage(data){
      this.currentpage = data;
      this.getData();
    },
    getData(){
      this.$https.checkWeek({
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
        }
      })
    },
    getsupdata(){
      this.$https.getsuperdata({}).then(res=>{
        if(res&&res.code==200){
          this.peoList = res.data;
        }else{
          this.$Message.error('获取信息失败！')
        }
      })
    },
    editInfo(data){
      if(!data.superVisorId||!data.workType||!data.workDate||!data.startTime||!data.endTime||!data.minuteTime||!data.workContent){
        this.$Message.error('请填写完整再保存！');
        return;
      };
      this.showModal = false;
      this.$https.editIntwork({
        id:data.id,
        superVisorId:data.superVisorId,
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
        };
      })
    },
    remoteMethod(query){
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const list = this.peoList.map(item => {
            return {
              username: item.username,
              chinesename: item.chinesename
            };
          });
          this.seloption = list.filter(item => item.chinesename.toLowerCase().indexOf(query.toLowerCase()) > -1);
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
#Writetime{
  .ivu-input{
    color:#3f4042;
  }
  .topTab{
    border-radius: 4px;
    // overflow: hidden;
    background-color: #fff;
    .title{
      border-bottom: 1px solid #E8EAEC;
      font-size: 18px;
      font-weight: 600;
      padding: 10px 15px;
    }
    .workBox{
      padding: 0 15px 20px;
      // overflow: hidden;
      position: relative;
      .squar{
        float: left;
        margin-right: 30px;
        .row_line{
          width: 154px;
          .tigname{
            display: block;
            color: #9EA0A5;
            height: 40px;
            line-height: 40px;
            width: 100%;
          }
        }
        .titletig{
          color: #9EA0A5;
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
    .wrap_line{
      display: flex;
      padding: 0 15px 10px;
      .row_line{
        flex: 1;
        margin-right: 20px;
        .tigname{
          display: block;
          color: #9EA0A5;
          height: 40px;
          line-height: 40px;
          width: 100%;
        }
        .time{
          height: 30px;
          line-height: 30px;
          display: block;
        }
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
    .titletig{
      color: #9EA0A5;
      font-weight: normal;
      line-height: 35px;
      height: 35px;
    }
    .btnbox{
      text-align: right;
      margin-bottom: 20px;
      margin-right: 15px;
      .subtn{
        width: 200px;
      }
    }
  }
  .tigrow{
    font-weight: 600;
    padding: 10px 15px;
    font-size: 18px;
    padding-left: 18px;
    border-bottom: 1px solid #ddd;
  }
  .tableBox{
    margin-top: 30px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
    .ivu-table th{
      background-color: #fff;
      font-weight: 400;
      color: #9ea0a5;
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