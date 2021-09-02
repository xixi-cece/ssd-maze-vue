<template>
    <div class="PublishActive">
        <div class="ltItem">
            <h3 class="tilehead">发布规划活动</h3>
            <div class="ltcontbox">
                <Tabs value="name3">
                    <TabPane label="课外活动" name="name1">
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>活动名称</b>
                                <Input v-model="activeName" placeholder="请添加活动名称" style="width:100%;" />
                            </div>
                            <div class="flexitm">
                                <b>主办方</b>
                                <Input v-model="activeName" placeholder="请添加主办方" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>官方链接</b>
                                <Input v-model="activeName" placeholder="请添加官方链接" style="width:100%;" />
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>学科方向</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in xklist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="xklist" :oldgplist='xkoldlist' @changegpval="chagexkval"></Popsearch>
                            </div>
                            <div class="flexitm">
                                <b>活动形式</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in hdlist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="hdlist" :oldgplist='hdoldlist' @changegpval="chagehdval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>内容介绍</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单描述一下内容吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>活动时间</b>
                                <Select v-model="activetime" style="width:100%;">
                                    <Option value="季节标签">季节标签</Option>
                                    <Option value="具体日期区间">具体日期区间</Option>
                                </Select>
                                <div class="daybox" v-if="activetime=='季节标签'">
                                    <span v-for="(itm,k) in jrlist" :key="k" :class="['tigspan',itm.ischeck?'blue':'']" @click="checkspan(itm)">{{itm.value}}</span>
                                </div>
                                <DatePicker v-if="activetime=='具体日期区间'" class="daybox" type="daterange" :value="checkdate" split-panels placeholder="请选择" style="width: 100%;" @click="getjrdate"></DatePicker>
                            </div>
                            <div class="flexitm">
                                <b>截止日期</b>
                                <Select v-model="endtime" style="width:100%;">
                                    <Option value="月份标签">月份标签</Option>
                                    <Option value="具体日期">具体日期</Option>
                                </Select>
                                <div class="daybox" v-if="endtime=='月份标签'">
                                    <div class="tigbox">
                                        <span v-for="(v,i) in yflist" :key="i">{{v}}</span>
                                    </div>
                                    <Popmonth :oldmonthval="yflist" :oldmonthlist='hismonthlist' @changemonthval="changemonval"></Popmonth>
                                </div>
                                <DatePicker type="date" class="daybox" v-if="endtime=='具体日期'" placeholder="请选择" :value="checkmondate" style="width: 100%;" @click="getmondate"></DatePicker>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>活动地点</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in placelist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="placelist" :oldgplist='hisplacelist' @changegpval="changeplaceval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>年级要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>年龄要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>过往学员</b>
                                <div>
                                    <Input v-model="activeName" placeholder="搜索过往学员" icon='ios-search' style="width:303px;" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>含金量</b>
                                <div>
                                    <Rate v-model="ratenum" />
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>性价比</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in tiglist' :key="i" :class="v.ischeck?'blue':''" @click="checkTig(v)">{{v.value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>马丽点评</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单评价一下活动内容吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="btmbox">
                            <Button type="primary">发布</Button>
                            <Button>保存</Button>
                        </div>
                    </TabPane>
                    <TabPane label="夏校" name="name2">
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>夏校名称</b>
                                <Input v-model="activeName" placeholder="请添加夏校名称" style="width:100%;" />
                            </div>
                            <div class="flexitm">
                                <b>主办方</b>
                                <Input v-model="activeName" placeholder="请添加主办方" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>官方链接</b>
                                <Input v-model="activeName" placeholder="请添加官方链接" style="width:100%;" />
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>学科方向</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in xklist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="xklist" :oldgplist='xkoldlist' @changegpval="chagexkval"></Popsearch>
                            </div>
                            <div class="flexitm">
                                <b>夏校形式</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in hdlist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="hdlist" :oldgplist='hdoldlist' @changegpval="chagehdval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>内容介绍</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单描述一下内容吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>夏校时间</b>
                                <Select v-model="activetime" style="width:100%;">
                                    <Option value="季节标签">季节标签</Option>
                                    <Option value="具体日期区间">具体日期区间</Option>
                                </Select>
                                <div class="daybox" v-if="activetime=='季节标签'">
                                    <span v-for="(itm,k) in jrlist" :key="k" :class="['tigspan',itm.ischeck?'blue':'']" @click="checkspan(itm)">{{itm.value}}</span>
                                </div>
                                <DatePicker v-if="activetime=='具体日期区间'" class="daybox" type="daterange" :value="checkdate" split-panels placeholder="请选择" style="width: 100%;" @click="getjrdate"></DatePicker>
                            </div>
                            <div class="flexitm">
                                <b>申请截止日期</b>
                                <Select v-model="endtime" style="width:100%;">
                                    <Option value="月份标签">月份标签</Option>
                                    <Option value="具体日期">具体日期</Option>
                                </Select>
                                <div class="daybox" v-if="endtime=='月份标签'">
                                    <div class="tigbox">
                                        <span v-for="(v,i) in yflist" :key="i">{{v}}</span>
                                    </div>
                                    <Popmonth :oldmonthval="yflist" :oldmonthlist='hismonthlist' @changemonthval="changemonval"></Popmonth>
                                </div>
                                <DatePicker type="date" class="daybox" v-if="endtime=='具体日期'" placeholder="请选择" :value="checkmondate" style="width: 100%;" @click="getmondate"></DatePicker>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>夏校地点</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in placelist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="placelist" :oldgplist='hisplacelist' @changegpval="changeplaceval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>费用</b>
                                <Input v-model="activeName" placeholder="请添加夏校名称" style="width:100%;" />
                            </div>
                            <div class="flexitm">
                                <b>项目时长</b>
                                <Input v-model="activeName" placeholder="请添加主办方" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>有无学分</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in xflist' :key="i" :class="v.ischeck?'blue':''" @click="checkXf(v)">{{v.value}}</span>
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>录取难度</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in lqndlist' :key="i" :class="v.ischeck?'blue':''" @click="checkNd(v)">{{v.value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>年级要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>年龄要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>申请要求</b>
                                <Input class="smtext" v-model="activeName" type="textarea" placeholder="请添加该夏校的语言、学术要求" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>过往学员</b>
                                <div>
                                    <Input v-model="activeName" placeholder="搜索过往学员" icon='ios-search' style="width:303px;" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>推荐指数</b>
                                <div>
                                    <Rate v-model="ratenum" />
                                </div>
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>马丽 Insights</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单说两句吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="btmbox">
                            <Button type="primary">发布</Button>
                            <Button>保存</Button>
                        </div>
                    </TabPane>
                    <TabPane label="竞赛" name="name3">
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛名称</b>
                                <Input v-model="activeName" placeholder="请添加夏校名称" style="width:100%;" />
                            </div>
                            <div class="flexitm">
                                <b>主办方</b>
                                <Input v-model="activeName" placeholder="请添加主办方" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>官方链接</b>
                                <Input v-model="activeName" placeholder="请添加官方链接" style="width:100%;" />
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>学科方向</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in xklist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="xklist" :oldgplist='xkoldlist' @changegpval="chagexkval"></Popsearch>
                            </div>
                            <div class="flexitm">
                                <b>竞赛形式</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in hdlist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="hdlist" :oldgplist='hdoldlist' @changegpval="chagehdval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>兴趣特长</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in xklist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="xklist" :oldgplist='xkoldlist' @changegpval="chagexkval"></Popsearch>
                            </div>
                            <div class="flexitm">
                                <b>所需能力</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in hdlist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="hdlist" :oldgplist='hdoldlist' @changegpval="chagehdval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>赛制</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in gamelist' :key="i" :class="v.ischeck?'blue':''" @click="checkGame(v)">{{v.value}}</span>
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>奖项级别</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in prizelist' :key="i" :class="v.ischeck?'blue':''" @click="checkPrize(v)">{{v.value}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛难度</b>
                                <div class="tigbox">
                                    <span style="cursor:pointer;" v-for='(v,i) in lqndlist' :key="i" :class="v.ischeck?'blue':''" @click="checkNd(v)">{{v.value}}</span>
                                </div>
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>内容介绍</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单描述一下内容吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛时间</b>
                                <Select v-model="activetime" style="width:100%;">
                                    <Option value="季节标签">季节标签</Option>
                                    <Option value="具体日期区间">具体日期区间</Option>
                                </Select>
                                <div class="daybox" v-if="activetime=='季节标签'">
                                    <span v-for="(itm,k) in jrlist" :key="k" :class="['tigspan',itm.ischeck?'blue':'']" @click="checkspan(itm)">{{itm.value}}</span>
                                </div>
                                <DatePicker v-if="activetime=='具体日期区间'" class="daybox" type="daterange" :value="checkdate" split-panels placeholder="请选择" style="width: 100%;" @click="getjrdate"></DatePicker>
                            </div>
                            <div class="flexitm">
                                <b>报名截止日期</b>
                                <Select v-model="endtime" style="width:100%;">
                                    <Option value="月份标签">月份标签</Option>
                                    <Option value="具体日期">具体日期</Option>
                                </Select>
                                <div class="daybox" v-if="endtime=='月份标签'">
                                    <div class="tigbox">
                                        <span v-for="(v,i) in yflist" :key="i">{{v}}</span>
                                    </div>
                                    <Popmonth :oldmonthval="yflist" :oldmonthlist='hismonthlist' @changemonthval="changemonval"></Popmonth>
                                </div>
                                <DatePicker type="date" class="daybox" v-if="endtime=='具体日期'" placeholder="请选择" :value="checkmondate" style="width: 100%;" @click="getmondate"></DatePicker>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛地点</b>
                                <div class="tigbox">
                                    <span v-for="(v,i) in placelist" :key="i">{{v}}</span>
                                </div>
                                <Popsearch :oldgpval="placelist" :oldgplist='hisplacelist' @changegpval="changeplaceval"></Popsearch>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>年级要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                            <div class="flexitm">
                                <b>年龄要求</b>
                                <div class="dbiptbox">
                                    <Input v-model="activeName" type="number" />
                                    <span class="hline">-</span>
                                    <Input v-model="activeName" type="number" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>报名要求</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单描述一下报名方式吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>如何准备？</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单描述一下准备方式吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛冷知识</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单说两句吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>过往学员</b>
                                <div>
                                    <Input v-model="activeName" placeholder="搜索过往学员" icon='ios-search' style="width:303px;" />
                                </div>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>推荐指数</b>
                                <div>
                                    <Rate v-model="ratenum" />
                                </div>
                            </div>
                            <div class="flexitm"></div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>马丽 Insights</b>
                                <Input v-model="activeName" type="textarea" placeholder="简单说两句吧！" style="width:100%;" />
                            </div>
                        </div>
                        <div class="btmbox">
                            <Button type="primary">发布</Button>
                            <Button>保存</Button>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <div class="rtItem">
            <div class="itemcard">
                <h3 class="tilehead">未发布规划活动</h3>
                <div class="unpubbox">
                    <div v-for="(v,i) in datalist" :key="i" class="linebox">
                        <span>{{v.value}}</span>
                        <img src="../images/del.png" class="delIcon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Popsearch from '@/components/Popsearch';
import Popmonth from '@/components/Popmonth';

export default {
    name:'PublishActive',
    data() {
        return {
            activeName:'',
            xkoldlist:[
                {
                    id:'1',
                    value:'文学 Literature'
                },
                {
                    id:'2',
                    value:'教育 Education'
                },
                {
                    id:'3',
                    value:'电影 Film Studies'
                },
                {
                    id:'4',
                    value:'生物 Biology'
                },
                {
                    id:'5',
                    value:'农学 Agriculture'
                },
                {
                    id:'6',
                    value:'动画设计 Animation'
                }
            ],
            xklist:[],
            hdoldlist:[
                {
                    id:'1',
                    value:'课程'
                },
                {
                    id:'2',
                    value:'社区服务'
                },
                {
                    id:'3',
                    value:'研究'
                },
                {
                    id:'4',
                    value:'会议'
                },
                {
                    id:'5',
                    value:'出版物'
                },
                {
                    id:'6',
                    value:'现场工作'
                }
            ],
            hdlist:[],
            activetime:'',
            endtime:'',
            jrlist:[
                {
                    ischeck:false,
                    id:'1',
                    value:'春季'
                },
                {
                    ischeck:false,
                    id:'2',
                    value:'秋季'
                },
                {
                    ischeck:false,
                    id:'3',
                    value:'寒假'
                },
                {
                    ischeck:false,
                    id:'4',
                    value:'暑假'
                },
                {
                    ischeck:false,
                    id:'5',
                    value:'全年'
                }
            ],
            checkdate:'',
            checkmondate:'',
            yflist:[],
            hismonthlist:[
                {
                    id:'1',
                    value:'一月'
                },
                {
                    id:'2',
                    value:'二月'
                },
                {
                    id:'3',
                    value:'三月'
                },
                {
                    id:'4',
                    value:'四月'
                },
                {
                    id:'5',
                    value:'五月'
                },
                {
                    id:'6',
                    value:'六月'
                },
                {
                    id:'7',
                    value:'七月'
                },
                {
                    id:'8',
                    value:'八月'
                },
                {
                    id:'9',
                    value:'九月'
                },
                {
                    id:'10',
                    value:'十月'
                },
                {
                    id:'11',
                    value:'十一月'
                },
                {
                    id:'12',
                    value:'十二月'
                }
            ],
            placelist:[],
            hisplacelist:[
                {
                    id:'1',
                    value:'加拿大'
                },
                {
                    id:'2',
                    value:'波士顿'
                },
                {
                    id:'3',
                    value:'美国'
                },
                {
                    id:'4',
                    value:'英国'
                }
            ],
            tiglist:[
                {
                    key:1,
                    ischeck:false,
                    value:'高性价比'
                },
                {
                    key:2,
                    ischeck:false,
                    value:'中性价比'
                },
                {
                    key:3,
                    ischeck:false,
                    value:'低性价比'
                }
            ],
            ratenum:1,
            datalist:[
                {
                    id:1,
                    value:'规划活动保存未发布'
                },
                {
                    id:2,
                    value:'规划活动保存未发布'
                }
            ],
            xflist:[
                {
                    id:1,
                    ischeck:false,
                    value:'有学分'
                },
                {
                    id:2,
                    ischeck:false,
                    value:'无学分'
                }
            ],
            lqndlist:[
                {
                    id:1,
                    ischeck:false,
                    value:'高难度'
                },
                {
                    id:2,
                    ischeck:false,
                    value:'中难度'
                },
                {
                    id:3,
                    ischeck:false,
                    value:'低难度'
                }
            ],
            gamelist:[
                {
                    id:1,
                    ischeck:false,
                    value:'个人'
                },
                {
                    id:2,
                    ischeck:false,
                    value:'团体'
                }
            ],
            prizelist:[
                {
                    id:1,
                    ischeck:false,
                    value:'国际级'
                },
                {
                    id:2,
                    ischeck:false,
                    value:'国家级'
                },
                {
                    id:3,
                    ischeck:false,
                    value:'省级/州级/区域/线上级'
                }
            ]
        };
    },
    components: {
        Popsearch,
        Popmonth
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
        chagexkval(data){
            this.xklist = data;
        },
        chagehdval(data){
            this.hdlist = data;
        },
        checkspan(data){
            const arr = this.jrlist;
            arr.forEach(v=>{
                if(data.value==v.value){
                    v.ischeck = !v.ischeck;
                }
            });
            this.jrlist = arr;
        },
        getjrdate(date){
            this.checkdate = date;
        },
        getmondate(date){
            this.checkmondate = date;
        },
        changemonval(data){
            this.yflist = data;
        },
        changeplaceval(data){
            this.placelist = data;
        },
        checkTig(data){
            const arr = this.tiglist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.value==data.value){
                    v.ischeck = true;
                };
            })
        },
        checkXf(data){
            const arr = this.xflist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.value==data.value){
                    v.ischeck = true;
                };
            })
        },
        checkNd(data){
            const arr = this.lqndlist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.value==data.value){
                    v.ischeck = true;
                };
            })
        },
        checkGame(data){
            const arr = this.gamelist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.value==data.value){
                    v.ischeck = true;
                };
            })
        },
        checkPrize(data){
            const arr = this.prizelist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.value==data.value){
                    v.ischeck = true;
                };
            })
        }
    }
};
</script>

<style lang='scss'>
.PublishActive{
    overflow: hidden;
    min-height: 200px;
    .ltItem{
        width: 68%;
        float: left;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        background-color: #fff;
        .tilehead{
            font-size: 18px;
            border-bottom: 1px solid #EAEDF3;
            padding: 20px 24px;
        }
        .ltcontbox{
            padding: 25px 24px;
            .ivu-tabs-bar{
                border:none;
            }
            .ivu-tabs-nav .ivu-tabs-tab{
                padding: 8px 0;
                margin-right: 40px;
                font-weight: 600;
                color: #6B6C6F;
            }
            .ivu-tabs-tab-active,.ivu-tabs-tab-focused{
                color: #3E3F42!important;
                border-bottom: 3px solid #1665D8!important;
            }
            .ivu-tabs-ink-bar{
                display: none;
            }
        }
        .boxflex{
            display: flex;
            font-size: 14px;
            .flexitm{
                margin-bottom: 20px;
                margin-right: 60px;
                flex: 1;
                &:last-of-type{
                    margin-right: 0;
                }
                >b{
                    margin-bottom: 10px;
                    display: inline-block;
                }
                textarea.ivu-input{
                    height: 150px;
                    resize: none;
                }
                .smtext{
                    textarea{
                        height: 60px;
                    }
                }
                .tigbox{
                    >span{
                        float: left;
                        padding: 4px 10px;
                        background-color: #F5F6FA;
                        border-radius: 4px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .addIcon{
                    display: inline-block;
                    width: 28px;
                    cursor: pointer;
                }
                .dbiptbox{
                    display: flex;
                    .ivu-input{
                        flex: 1;
                    }
                    .hline{
                        display: inline-block;
                        vertical-align: middle;
                        margin: 4px 10px 0;
                    }
                }
                .ivu-rate-star-full:before{
                    color: #1665D8;
                }
            }
        }
        .daybox{
            margin-top: 14px;
            >.tigspan{
                display: inline-block;
                padding: 6px 10px;
                background-color: #F5F6FA;
                border-radius: 4px;
                margin-right: 10px;
                font-size: 12px;
                cursor: pointer;
            }
        }
        .blue{
            color: #1665D8;
            background-color: rgba(22, 101, 216, .1)!important;
        }
    }
    .rtItem{
        width: 30%;
        float: right;
        margin-left: 20px;
        .itemcard{
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
            border-radius: 4px;
            border: 1px solid #EAEDF3;
            background-color: #fff;
            .tilehead{
                font-size: 18px;
                border-bottom: 1px solid #EAEDF3;
                padding: 20px 24px;
            }
            .unpubbox{
                padding: 24px 0;
                .linebox{
                    position: relative;
                    padding: 10px 20px;
                    margin-bottom: 10px;
                    background-color: #FBFBFD;
                    >span{
                        display: inline-block;
                        width: 330px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .delIcon{
                        position: absolute;
                        right: 24px;
                        top:50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .btmbox{
        .ivu-btn{
            width:100px;
            color: #fff;
            &:last-of-type{
                background-color: #6B6C6F;
                border-color: #6B6C6F;
            }
        }
        .ivu-btn-primary{
            background-color:#1665D8;
            margin-right: 20px;
        }
    }
}
</style>