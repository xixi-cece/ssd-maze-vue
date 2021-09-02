<template>
    <div class="CourseActive">
        <div class="flexBox">
            <div class="lfItem">
                <div class="lfchind" v-if="false">
                    <div class="itemcard" v-for="(v,i) in datalist" :key="i">
                        <h4 class="timetip"><span class="yearbox">{{v.year}}</span></h4>
                        <Collapse v-for="(item,j) in v.list" :key="j" v-model="showtab">
                            <Panel :name="item.id">
                                <div>
                                    <h3 class="pantile">
                                        <i class="cire">{{item.month}}</i>
                                        <span>{{item.title}}</span>
                                        <Icon class="delIcon" type="ios-trash-outline" @click.stop="delItem(item)"/>
                                    </h3>
                                    <p class="pandesc">{{item.desc}}</p>
                                </div>
                                <div slot="content">
                                    <div class="tabBox">
                                        <Tabs value="name1">
                                            <TabPane label="内容介绍" name="name1">{{item.contentval}}</TabPane>
                                            <TabPane label="导师点评" name="name2">{{item.teachval}}</TabPane>
                                        </Tabs>
                                    </div>
                                    <div class="boxflex">
                                        <div class="flexitm">
                                            <b>活动地点</b>
                                            <span>{{item.activeplace}}</span>
                                        </div>
                                        <div class="flexitm">
                                            <b>活动形式</b>
                                            <span>{{item.activetype}}</span>
                                        </div>
                                    </div>
                                    <div class="boxflex">
                                        <div class="flexitm">
                                            <b>截止时间</b>
                                            <span>{{item.endtime}}</span>
                                        </div>
                                        <div class="flexitm">
                                            <b>官放链接</b>
                                            <span><a :href="item.link" target="_blank">{{item.link}}</a></span>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
            <div class="rtclsItem">
                <div class="optionItem">
                    <Tabs v-model="curtTab" name="tabchild" @on-click='changeTab'>
                        <TabPane label="夏校" name="cv1" tab="tabchild">
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索夏校" icon="ios-search" clearable @on-change="serchData(1)"/>
                            <div class="optionbox">
                                <span :class="['optitem',showSch?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showSch" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">学校</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="serval_sch" placeholder="搜索大学" @on-change='serschData' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkschool">
                                                    <Checkbox v-for="(v,i) in schoolarrs" :key="i" :label="v">{{v}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkschool" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delschHis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearschAll">清空全部</Button>
                                                    <Button class="sure_btn" @click="hideschProp">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',showPro?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showPro" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="serval_pro" placeholder="搜索专业" @on-change='serproData' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkspro">
                                                    <Checkbox v-for="(v,i) in proarrs" :key="i" :label="v.majorEN">{{v.majorEN}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkspro" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delproHis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearproAll">清空全部</Button>
                                                    <Button class="sure_btn" @click="hideproProp">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',showTeach?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showTeach" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">授课形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checksteach">
                                                    <Checkbox v-for="(v,i) in teacharrs" :key="i" :label="v.tag">{{v.tag}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checksteach" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delteachHis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearteachAll">清空全部</Button>
                                                    <Button class="sure_btn" @click="hideteachProp">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                            </div>
                        </TabPane>
                        <TabPane label="竞赛" name="cv2" tab="tabchild">
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索竞赛" icon="ios-search" clearable @on-change="serchData(2)"/>
                            <div class="optionbox">
                                <span :class="['optitem',showGrade?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showGrade" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">级别</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkgrade">
                                                    <Checkbox v-for="(v,i) in gradearrs" :key="i" :label="v.tag">{{v.tag}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkgrade" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delgradeHis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="cleargradeAll">清空全部</Button>
                                                    <Button class="sure_btn" @click="hidegradeProp">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',showcomPro?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomPro" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="ser_comPro" placeholder="搜索专业" @on-change='sercomProdata' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkscomPro">
                                                    <Checkbox v-for="(v,i) in comProdatas" :key="i" :label="v.majorEN">{{v.majorEN}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkscomPro" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delcomProhis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearcomProall">清空全部</Button>
                                                    <Button class="sure_btn" @click="hidecomProp">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',showcomFormat?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomFormat" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">比赛形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkFormat">
                                                    <Checkbox v-for="(v,i) in formatArrs" :key="i" :label="v.tag">{{v.tag}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkFormat" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delFormatHis(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearFormatall">清空全部</Button>
                                                    <Button class="sure_btn" @click="hideFormat">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',showcomSystem?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomSystem" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">比赛赛制</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkcomSystem">
                                                    <Checkbox v-for="(v,i) in conSystemArrs" :key="i" :label="v.tag">{{v.tag}}</Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in checkcomSystem" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="delcomSystem(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="clearcomSystem">清空全部</Button>
                                                    <Button class="sure_btn" @click="hidecomSystem">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                            </div>
                        </TabPane>
                        <TabPane label="课外活动" name="cv3" tab="tabchild">
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索课外活动" icon="ios-search" clearable @on-change="serchData(3)"/>
                            <div class="optionbox">
                                <span :class="['optitem',active_showarea?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showarea" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">区域</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkareas">
                                                    <Checkbox v-for="(v,i) in active_areaArrs" :key="i" :label="v.tag"></Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in active_checkareas" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="active_delarea(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="active_cleararea">清空全部</Button>
                                                    <Button class="sure_btn" @click="active_hidearea">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',actve_showpro?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="actve_showpro" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="active_serpro" placeholder="搜索专业" @on-change='active_changepro' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="active_checkpro">
                                                    <Checkbox v-for="(v,i) in active_proarrs" :key="i" :label="v.majorEN"></Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in active_checkpro" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="active_delpro(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="active_clearpro">清空全部</Button>
                                                    <Button class="sure_btn" @click="active_hidepro">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',active_showform?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showform" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">活动形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkform">
                                                    <Checkbox v-for="(v,i) in active_formArrs" :key="i" :label="v.tag"></Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in active_checkform" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="active_delform(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="active_clearform">清空全部</Button>
                                                    <Button class="sure_btn" @click="active_hideform">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                                <span :class="['optitem',active_showgold?'boldFont':'']">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showgold" popper-class='gpbox' placement='bottom' @on-popper-hide='restactive'>
                                        <div class="btn_item">含金量</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkgold">
                                                    <Checkbox v-for="(v,i) in active_goldarrs" :key="i" :label="v.tag"></Checkbox>
                                                </CheckboxGroup>
                                                <Divider class="gp_line" />
                                                <div class="serhisbox">
                                                    <span class="itmhis" v-for="(v,i) in active_checkgold" :key="i">
                                                        <b>{{v}}</b>
                                                        <Icon type="ios-close" @click="active_delgold(i)" />
                                                    </span>
                                                </div>
                                                <div class="btm_option clearfix">
                                                    <Button class="allnull" @click="active_cleargold">清空全部</Button>
                                                    <Button class="sure_btn" @click="active_hidegold">确认</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Poptip>
                                </span>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div class="listBox" v-if="curtTab=='cv1'&&!showDetail">
                    <h4 class="tiletip">共{{summerschlist.length}}条夏校</h4>
                    <Divider />
                    <div style="text-align: center;" v-if="!summerschlist.length&&showsumer">加载中...</div>
                    <div class="itmcard" v-for="(item,j) in summerschlist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="item.enName">
                                <span class="miantile">{{item.enName}}</span>
                            </Tooltip>
                            <span class="rightIcon">
                                <Icon custom="iconfont iconfuhao-lianjie" class="grayIcon" @click="openLink(item)" />
                                <Icon custom="iconfont iconxiangqing1" class="grayIcon" @click="changeItem(item)" />
                            </span>
                        </div>
                        <div class="tipbox">
                            <span class="tipspan green" v-if="item.haveCredits">{{item.haveCredits}}</span>
                            <span class="tipspan puper" v-if="item.admissionDifficulty">{{item.admissionDifficulty}}</span>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>主办学校</b>
                                <span>{{item.sponsor}}</span>
                            </div>
                            <div class="flexitm">
                                <b>简称</b>
                                <span>{{item.abbreviation}}</span>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>授课形式</b>
                                <span>{{item.forms.length?item.forms.join(','):''}}</span>
                            </div>
                            <div class="flexitm">
                                <b>申请截止</b>
                                <span>{{item.deadline}}</span>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv1'&&showDetail">
                    <h3 @click="showList">
                        <Icon type="ios-arrow-back"/>
                        <span>返回结果页</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.enName">
                                <span class="miantile boldtile">{{curentObj.enName}}</span>
                            </Tooltip>
                            <span class="tigspan" @click="openLink(curentObj)">官网</span>
                        </div>
                        <p class="tip">{{curentObj.abbreviation}}</p>
                        <h4 class="contdesc">内容介绍</h4>
                        <p :class="['valdesc',showmore?'noHeight':'']">{{curentObj.content}}</p>
                        <div class="loadmore" v-if='!showmore' @click="clickLoad">
                            <span>展开更多</span>
                            <Icon type="ios-arrow-down"/>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>授课形式</h4>
                                <p>{{curentObj.forms.length?curentObj.forms.join(','):''}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>申请截止日期</h4>
                                <p>{{curentObj.deadline}}</p>
                            </div>
                        </div>
                        <h4 class="contdesc">申请要求</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.demand}}</p>
                        <h4 class="contdesc">EC Head 评价</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.comment}}</p>
                    </div>
                </div>
                <div class="listBox" v-if="curtTab=='cv2'&&!showDetail">
                    <h4 class="tiletip">共{{corelist.length}}条竞赛</h4>
                    <Divider />
                    <div style="text-align: center;" v-if="!corelist.length&&showsumer">加载中...</div>
                    <div class="itmcard" v-for="(item,j) in corelist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="item.cnName">
                                <span class="miantile">{{item.cnName}}</span>
                            </Tooltip>
                            <span class="rightIcon">
                                <Icon custom="iconfont iconfuhao-lianjie" class="grayIcon" @click="openLink(item)" />
                                <Icon custom="iconfont iconxiangqing1" class="grayIcon" @click="changeItem(item)" />
                            </span>
                        </div>
                        <div class="tipbox smtile">{{item.enName}}</div>
                        <!-- <p class="descbox">{{item.desc}}</p> -->
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>主办方</b>
                                <span>{{item.sponsor}}</span>
                            </div>
                            <div class="flexitm">
                                <b>简称</b>
                                <span>{{item.abbreviation}}</span>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>比赛地点</b>
                                <span>{{item.venue}}</span>
                            </div>
                            <div class="flexitm">
                                <b>报名截止</b>
                                <span>{{item.deadline}}</span>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv2'&&showDetail">
                    <h3 @click="showList">
                        <Icon type="ios-arrow-back" />
                        <span>返回结果页</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.cnName">
                                <span class="miantile boldtile">{{curentObj.cnName}}</span>
                            </Tooltip>
                            <span class="tigspan" @click="openLink(curentObj)">官网</span>
                        </div>
                        <p class="tip">{{curentObj.enName}}</p>
                        <h4 class="contdesc">内容介绍</h4>
                        <p :class="['valdesc',showmore?'noHeight':'']">{{curentObj.content}}</p>
                        <div class="loadmore" v-if='!showmore' @click="clickLoad">
                            <span>展开更多</span>
                            <Icon type="ios-arrow-down"/>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>比赛形式</h4>
                                <p>{{curentObj.forms.length?curentObj.forms.join(','):''}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>报名截止时间</h4>
                                <p>{{curentObj.deadline}}</p>
                            </div>
                            <div class="itemflex">
                                
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>比赛地点</h4>
                                <p>{{curentObj.venue}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>比赛等级</h4>
                                <p>{{curentObj.levels.length?curentObj.levels.join(','):''}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>比赛赛制</h4>
                                <p>{{curentObj.systems.length?curentObj.systems.join(','):''}}</p>
                            </div>
                        </div>
                        <h4 class="contdesc">报名要求</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.demand}}</p>
                        <h4 class="contdesc">EC Head 评价</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.comment}}</p>
                    </div>
                </div>
                <div class="listBox" v-if="curtTab=='cv3'&&!showDetail">
                    <h4 class="tiletip">共{{activelist.length}}条课外活动</h4>
                    <Divider />
                    <div style="text-align: center;" v-if="!activelist.length&&showsumer">加载中...</div>
                    <div class="itmcard" v-for="(item,j) in activelist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="item.enName">
                                <span class="miantile">{{item.enName}}</span>
                            </Tooltip>
                            <span class="rightIcon">
                                <Icon custom="iconfont iconfuhao-lianjie" class="grayIcon" @click="openLink(item)" />
                                <Icon custom="iconfont iconxiangqing1" class="grayIcon" @click="changeItem(item)" />
                            </span>
                        </div>
                        <div class="boxflex" style="margin-top:20px;">
                            <div class="flexitm">
                                <b>主办方</b>
                                <span>{{item.sponsor}}</span>
                            </div>
                            <div class="flexitm">
                                <b>含金量</b>
                                <span>{{item.goldContent}}</span>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>活动地点</b>
                                <span>{{item.venues.length?item.venues.join(','):''}}</span>
                            </div>
                            <div class="flexitm">
                                <b>活动时间</b>
                                <span>{{item.time}}</span>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv3'&&showDetail">
                    <h3 @click="showList">
                        <Icon type="ios-arrow-back" />
                        <span>返回结果页</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.enName">
                                <span class="miantile boldtile">{{curentObj.enName}}</span>
                            </Tooltip>
                            <span class="tigspan" @click="openLink(curentObj)">官网</span>
                        </div>
                        <h4 class="contdesc">内容介绍</h4>
                        <p :class="['valdesc',showmore?'noHeight':'']">{{curentObj.content}}</p>
                        <div class="loadmore" v-if='!showmore' @click="clickLoad">
                            <span>展开更多</span>
                            <Icon type="ios-arrow-down"/>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>活动地点</h4>
                                <p>{{curentObj.venues.length?curentObj.venues.join(','):''}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>活动时间</h4>
                                <p>{{curentObj.time}}</p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>活动形式</h4>
                                <p>{{curentObj.forms.length?curentObj.forms.join(','):''}}</p>
                            </div>
                            <div class="itemflex">
                                <h4>含金量</h4>
                                <p>{{curentObj.goldContent}}</p>
                            </div>
                        </div>
                        <h4 class="contdesc">报名要求</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.demand}}</p>
                        <h4 class="contdesc">EC Head 评价</h4>
                        <p class="valdesc" style="height:auto;">{{curentObj.comment}}</p>
                    </div>
                </div>
            </div>
        </div>
        <class-modal :showClass="showPop" @close="hideClass"></class-modal>
    </div>
</template>

<script>
import ClassModal from '@/components/ClassModal';

export default {
    props:{
        id:''
    },
    data() {
        return {
            page:1,
            pageSize:1000,
            showtab:'1_0',//展开项
            datalist:[
                {
                    year:2021,
                    list:[
                        {
                            id:'1_0',
                            month:'6月',
                            title:'课外活动的标题标题标题标题标题标题标题',
                            desc:'主办方主办方主办方主办方',
                            contentval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情',
                            teachval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详',
                            itemplace:'北京鸟巢',
                            activetype:'线上+线下',
                            endtime:'2021.09.15',
                            link:'http://www.baidu.com'
                        },
                        {
                            id:'1',
                            month:'5月',
                            title:'课外活动的标题标题标题标题标题标题标题',
                            desc:'主办方主办方主办方主办方',
                            contentval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情',
                            teachval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详',
                            itemplace:'北京鸟巢',
                            activetype:'线上+线下',
                            endtime:'2021.09.15',
                            link:'http://www.baidu.com'
                        },
                        {
                            id:'2',
                            month:'1月',
                            title:'课外活动的标题标题标题标题标题标题标题',
                            desc:'主办方主办方主办方主办方',
                            contentval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情',
                            teachval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详',
                            itemplace:'北京鸟巢',
                            activetype:'线上+线下',
                            endtime:'2021.09.15',
                            link:'http://www.baidu.com'
                        }
                    ]
                },
                {
                    year:2020,
                    list:[
                        {
                            id:'0',
                            month:'8月',
                            title:'课外活动的标题标题标题标题标题标题标题',
                            desc:'主办方主办方主办方主办方',
                            contentval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详情',
                            teachval:'课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情课外活动详情，课外活动详情，课外活动详情，课外活动详情，课外活动详情，活动详情课外活动详情课外活动详情，课外活动详情，课外活动详',
                            itemplace:'北京鸟巢',
                            activetype:'线上+线下',
                            endtime:'2021.09.15',
                            link:'http://www.baidu.com'
                        }
                    ]
                }
            ],
            serchcuse:'',
            hislist:['是多少','递四方速递','的时光富商大贾','时高时低','十大歌手','股份的公司打工','胜多负少'],
            showmore:false,//是否显示加载更多
            showsumer:true,
            summerschlist:[],
            corelist:[],
            activelist:[],
            showPop:false,
            curtTab:'cv1',
            showDetail:false,
            curentObj:{
                title:'课外活动的标题标题标题',
                text:'课外活动的标题标题标题课外活动的标题标题标题课外活动的标题标题标题课外活动的标题标题标题课外活动的标题标题标题课外活动的标题标题标题'
            },
            showSch:false,
            showorhide:false,
            serval_sch:'',
            checkschool:[],
            oldscharrs:[],
            schoolarrs:[],
            showPro:false,
            serval_pro:'',
            checkspro:[],
            oldproarrs:[],
            proarrs:[],
            showTeach:false,
            teacharrs:[],
            checksteach:[],
            showGrade:false,
            checkgrade:[],
            gradearrs:[],
            showcomPro:false,
            ser_comPro:'',
            checkscomPro:[],
            oldcomProdatas:[],
            comProdatas:[],
            showcomFormat:false,
            checkFormat:[],
            formatArrs:[],
            showcomSystem:false,
            checkcomSystem:[],
            conSystemArrs:[],
            active_showarea:false,
            active_checkareas:[],
            active_areaArrs:[],
            actve_showpro:false,
            active_serpro:'',
            active_checkpro:[],
            oldactive_proarrs:[],
            active_proarrs:[],
            active_showform:false,
            active_checkform:[],
            active_formArrs:[],
            active_showgold:false,
            active_checkgold:[],
            active_goldarrs:[
                {
                    id:1,
                    tag:'高'
                },
                {
                    id:2,
                    tag:'中'
                },
                {
                    id:3,
                    tag:'低'
                }
            ]
        };
    },
    components: {
        ClassModal
    },
    watch: {
        id:{
            handler(now){
                if(now){
                    this.getmsgData();
                }
            },
            immediate:true,
            deep:true
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getschdata();
        this.getmajlist();
        this.getdatalist();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        delItem(data){
            this.$Modal.confirm({
                title:'温馨提示',
                content:'确定删除吗？',
                onOk(){

                },
                onCancel(){}
            })
        },
        //夏校
        hideschProp(){
            this.showSch = false;
        },
        hideproProp(){
            this.showPro = false;
        },
        hideteachProp(){
            this.showTeach = false;
        },
        clearschAll(){
            this.checkschool = [];
        },
        clearproAll(){
            this.checkspro = [];
        },
        clearteachAll(){
            this.checksteach = [];
        },
        //竞赛
        hidegradeProp(){
            this.showGrade = false;
        },
        hidecomProp(){
            this.showcomPro = false;
        },
        hideFormat(){
            this.showcomFormat = false;
        },
        hidecomSystem(){
            this.showcomSystem = false;
        },
        cleargradeAll(){
            this.checkgrade = [];
        },
        clearcomProall(){
            this.checkscomPro = [];
        },
        clearFormatall(){
            this.checkFormat = [];
        },
        clearcomSystem(){
            this.checkcomSystem = [];
        },
        //课外活动
        active_hidearea(){
            this.active_showarea = false;
        },
        active_hidepro(){
            this.actve_showpro = false;
        },
        active_hideform(){
            this.active_showform = false;
        },
        active_hidegold(){
            this.active_showgold = false;
        },
        active_cleararea(){
            this.active_checkareas = [];
        },
        active_clearpro(){
            this.active_checkpro = [];
        },
        active_clearform(){
            this.active_checkform = [];
        },
        active_cleargold(){
            this.active_checkgold = [];
        },
        delschHis(index){
            this.checkschool.splice(index,1);
        },
        delproHis(index){
            this.checkspro.splice(index,1);
        },
        delcomProhis(index){
            this.checkscomPro.splice(index,1);
        },
        delFormatHis(index){
            this.checkFormat.splice(index,1);
        },
        delcomSystem(index){
            this.checkcomSystem.splice(index,1);
        },
        active_delarea(index){
            this.active_checkareas.splice(index,1);
        },
        active_delpro(index){
            this.active_checkpro.splice(index,1);
        },
        delteachHis(index){
            this.checksteach.splice(index,1);
        },
        delgradeHis(index){
            this.checkgrade.splice(index,1);
        },
        active_delform(index){
            this.active_checkform.splice(index,1);
        },
        active_delgold(index){
            this.active_checkgold.splice(index,1);
        },
        getschdata(){
            this.$https.getschooldata({}).then(res=>{
                if(res&&res.code==200){
                    this.oldscharrs = res.data;
                    this.schoolarrs = res.data;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getmajlist(){
            this.$https.getmajordata({}).then(res=>{
                if(res&&res.code==200){
                    this.oldactive_proarrs = this.oldcomProdatas = this.oldproarrs = res.data;
                    this.active_proarrs = this.comProdatas = this.proarrs = res.data;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getdatalist(){
            this.$https.getagdata({}).then(res=>{
                if(res&&res.code==200){
                    this.teacharrs = res.data.teachingForm;
                    this.gradearrs = res.data.competitonLevel;
                    this.formatArrs = res.data.competitonForm;
                    this.conSystemArrs = res.data.competitonSystem;
                    this.active_areaArrs = res.data.activityVenue;
                    this.active_formArrs = res.data.activityForm;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        serschData(){
            const vm = this;
            clearTimeout(vm.timer);
            vm.timer = setTimeout(()=>{
                const val = this.serval_sch.toLocaleLowerCase();
                const arr = this.oldscharrs;
                if(/^s*$/.test(val)){
                    this.schoolarrs = this.oldscharrs;
                    return
                }
                const newArr = [];
                arr.forEach(v=>{
                    if((v.toLocaleLowerCase()).indexOf(val)!=-1){
                        newArr.push(v);
                    };
                });
                this.schoolarrs = newArr;
            },200)
        },
        serproData(){
            const vm = this;
            clearTimeout(vm.timer);
            vm.timer = setTimeout(()=>{
                const val = this.serval_pro.toLocaleLowerCase();
                const arr = this.oldproarrs;
                if(/^s*$/.test(val)){
                    this.proarrs = this.oldproarrs;
                    return
                }
                const newArr = [];
                arr.forEach(v=>{
                    if((v.majorEN.toLocaleLowerCase()).indexOf(val)!=-1){
                        newArr.push(v);
                    };
                });
                this.proarrs = newArr;
            },200)
        },
        sercomProdata(){
            const vm = this;
            clearTimeout(vm.timer);
            vm.timer = setTimeout(()=>{
                const val = this.ser_comPro.toLocaleLowerCase();
                const arr = this.oldcomProdatas;
                if(/^s*$/.test(val)){
                    this.comProdatas = this.oldcomProdatas;
                    return
                }
                const newArr = [];
                arr.forEach(v=>{
                    if((v.majorEN.toLocaleLowerCase()).indexOf(val)!=-1){
                        newArr.push(v);
                    };
                });
                this.comProdatas = newArr;
            },200)
        },
        active_changepro(){
            const vm = this;
            clearTimeout(vm.timer);
            vm.timer = setTimeout(()=>{
                const val = this.active_serpro.toLocaleLowerCase();
                const arr = this.oldactive_proarrs;
                if(/^s*$/.test(val)){
                    this.active_proarrs = this.oldactive_proarrs;
                    return
                }
                const newArr = [];
                arr.forEach(v=>{
                    if((v.majorEN.toLocaleLowerCase()).indexOf(val)!=-1){
                        newArr.push(v);
                    };
                });
                this.active_proarrs = newArr;
            },200)
        },
        hideClass(type){
            if(type==1){
                this.showPop = false;
            }else{
                this.showPop = false;
            }
        },
        changeTab(data){
            this.curtTab = data;
            this.showDetail = false;
            this.showmore = false;
            let type = 1;
            if(data == 'cv1'){
                type = 1;
            }else if(data == 'cv2'){
                type = 2;
            }else{
                type = 3;
            };
            this.clearAll(type);
        },
        clearAll(type){
            this.serchcuse = '';
            this.serval_sch = '';
            this.checkschool = [];
            this.serval_pro = '';
            this.checkspro = [];
            this.checksteach = [];
            this.checkgrade = [];
            this.ser_comPro = '';
            this.checkscomPro = [];
            this.checkFormat = [];
            this.checkcomSystem = [];
            this.active_checkareas = [];
            this.active_serpro = '';
            this.active_checkpro = [];
            this.active_checkform = [];
            this.active_checkgold = [];
            this.showsumer = true;
            this.serchData(type);
        },
        changeItem(data){
            this.showDetail = true;
            this.curentObj = data;
            this.$bus.$emit('goTop',1);
        },
        openLink(data){
            window.open(data.link)
        },
        showList(){
            this.showDetail = false;
            this.showmore = false;
        },
        clickLoad(){
            this.showmore = true;
        },
        restactive(){
            const ctab = this.curtTab;
            let type = 1;
            if(ctab == 'cv1'){
                type = 1;
            }else if(ctab == 'cv2'){
                type = 2;
            }else{
                type = 3;
            };
            this.serchData(type);
        },
        serchData(type){
            const vm = this;
            clearTimeout(vm.time1);
            vm.time1 = setTimeout(v=>{
                if(type===1){
                    this.getmsgData();
                }else if(type===2){
                    this.getcoreData();
                }else if(type===3){
                    this.getactiveData();
                }
            },800)
        },
        getmsgData(){
            const arr1 = this.oldproarrs;
            const checkarr1 = this.checkspro;
            const newArr1 = [];
            checkarr1.forEach(v=>{
                arr1.forEach(ivm=>{
                    if(v==ivm.majorEN){
                        newArr1.push(ivm.id)
                    };
                })
            })
            const arr2 = this.teacharrs;
            const checkarr2 = this.checksteach;
            const newArr2 = [];
            checkarr2.forEach(v2=>{
                arr2.forEach(ivm2=>{
                    if(v2==ivm2.tag){
                        newArr2.push(ivm2.id)
                    };
                })
            })
            this.$https.getsummerdata({
                page:this.page,
                pageSize:this.pageSize,
                sponsor:this.checkschool,
                majors:newArr1,
                forms:newArr2,
                keyword:this.serchcuse
            }).then(res=>{
                if(res&&res.code==200){
                    this.summerschlist = res.data.list;
                    this.showsumer = false;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getcoreData(){
            const arr1 = this.gradearrs;
            const checkarr1 = this.checkgrade;
            const newArr1 = [];
            checkarr1.forEach(v=>{
                arr1.forEach(ivm=>{
                    if(v==ivm.tag){
                        newArr1.push(ivm.id)
                    };
                })
            })
            const arr2 = this.oldcomProdatas;
            const checkarr2 = this.checkscomPro;
            const newArr2 = [];
            checkarr2.forEach(v2=>{
                arr2.forEach(ivm2=>{
                    if(v2==ivm2.majorEN){
                        newArr2.push(ivm2.id)
                    };
                })
            })
            const arr3 = this.formatArrs;
            const checkarr3 = this.checkFormat;
            const newArr3 = [];
            checkarr3.forEach(v3=>{
                arr3.forEach(ivm3=>{
                    if(v3==ivm3.tag){
                        newArr3.push(ivm3.id)
                    };
                })
            })
            const arr4 = this.conSystemArrs;
            const checkarr4 = this.checkcomSystem;
            const newArr4 = [];
            checkarr4.forEach(v4=>{
                arr4.forEach(ivm4=>{
                    if(v4==ivm4.tag){
                        newArr4.push(ivm4.id)
                    };
                })
            })
            this.$https.getcoredata({
                page:this.page,
                pageSize:this.pageSize,
                levels:newArr1,
                majors:newArr2,
                forms:newArr3,
                systems:newArr4,
                keyword:this.serchcuse
            }).then(res=>{
                if(res&&res.code==200){
                    this.corelist = res.data.list;
                    this.showsumer = false;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getactiveData(){
            const arr1 = this.active_areaArrs;
            const checkarr1 = this.active_checkareas;
            const newArr1 = [];
            checkarr1.forEach(v=>{
                arr1.forEach(ivm=>{
                    if(v==ivm.tag){
                        newArr1.push(ivm.id)
                    };
                })
            })
            const arr2 = this.oldactive_proarrs;
            const checkarr2 = this.active_checkpro;
            const newArr2 = [];
            checkarr2.forEach(v2=>{
                arr2.forEach(ivm2=>{
                    if(v2==ivm2.majorEN){
                        newArr2.push(ivm2.id)
                    };
                })
            })
            const arr3 = this.active_formArrs;
            const checkarr3 = this.active_checkform;
            const newArr3 = [];
            checkarr3.forEach(v3=>{
                arr3.forEach(ivm3=>{
                    if(v3==ivm3.tag){
                        newArr3.push(ivm3.id)
                    };
                })
            })
            this.$https.getactivelist({
                page:this.page,
                pageSize:this.pageSize,
                venues:newArr1,
                majors:newArr2,
                forms:newArr3,
                goldContent:this.active_checkgold,
                keyword:this.serchcuse
            }).then(res=>{
                if(res&&res.code==200){
                    this.activelist = res.data.list;
                    this.showsumer = false;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        }
    }
};
</script>

<style lang='scss'>
.CourseActive{
    .flexBox{
        display: flex;
    }
    .lfItem{
        flex: 1;
        margin-right: 20px;
        .lfchind{
            background-color: #fff;
            padding: 10px 24px 20px;
            border-radius: 4px;
        }
        .ivu-collapse{
            border: none;
            position: relative;
            background-color: #fff;
            &:last-of-type{
                .ivu-collapse-content{
                    &:before{
                        position: absolute;
                        left: -6px;
                        bottom: 0;
                        content: '';
                        width: 10px;
                        height: 100%;
                        z-index: 3;
                        background-color: #fff;
                    }
                }
                .ivu-collapse-header{
                    &:before{
                        position: absolute;
                        left: -6px;
                        top: 35px;
                        content: '';
                        width: 10px;
                        height: 80%;
                        z-index: 3;
                        background-color: #fff;
                    }
                }
            }
            >.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
                border: none;   
            }
            .ivu-collapse-item{
                // border-top: 0;
                border-left: 1px solid #E8F0FB;
                border-bottom: 1px solid #E8F0FB;
                &:after{
                    position: absolute;
                    bottom:-4px;
                    left: 1px;
                    content: "";
                    height: 10px;
                    width: 30px;
                    background-color: #fff;
                }
            }
            .ivu-collapse-item-active{
                border-bottom: none;
            }
            .ivu-tabs-tab-active,.ivu-tabs-tab-focused{
                font-weight: 600!important;
            }
            .ivu-collapse-header{
                border: none;
                background-color:#fff;
                height: auto;
                line-height: normal;
                // padding: 10px 20px;
                padding: 20px 0 20px 30px;
                position: relative;
                .ivu-icon{
                    float: right;
                    background-color: #F5F5F5;
                    padding: 4px;
                    border-radius: 50%;
                }
                .pantile{
                    font-size: 16px;
                    color: #3E3F42;
                    .delIcon{
                        float: none;
                        background-color: #fff;
                        border-radius: 0;
                        vertical-align: middle;
                        display: inline-block;
                        margin-top: -2px;
                        font-size: 18px;
                        margin-left: 5px;
                    }
                    .cire{
                        list-style: none;
                        font-style: normal;
                        position: absolute;
                        left: -35px;
                        top: 25%;
                        color: #1665D8;
                        font-size: 14px;
                        &:after{
                            position: absolute;
                            content:'';
                            width: 7px;
                            height: 7px;
                            background-color: #1665D8;
                            border-radius: 50%;
                            right: -15px;
                            top: 6px;
                        }
                    }
                }
                .pandesc{
                    color: #9EA0A5;
                    font-size: 14px;
                }
            }
            .ivu-collapse-content{
                padding: 0;
                padding-left: 30px;
                position: relative;
            }
            .ivu-collapse-content-box{
                padding-top: 0;
                border-bottom: 1px solid #E8F0FB;
            }
            .tabBox{
                margin-bottom: 20px;
                .ivu-tabs-tab{
                    padding: 8px 0!important;
                    color: #9EA0A5;
                    font-size: 14px;
                }
                .ivu-tabs-bar{
                    padding: 0!important;
                }
                .ivu-tabs-tabpane{
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
    .boxflex{
        display: flex;
        font-size: 12px;
        .flexitm{
            margin-bottom: 10px;
            flex: 1;
            >b{
                color: #3E3F42;
                margin-right: 10px;
            }
            >span{
                color: #6B6C6F;
            }
        }
    }
    .rtclsItem{
        width: 40%;
    }
    .itemcard{
        padding-left: 38px;
        .timetip{
            position: relative;
            font-size: 16px;
            height: 35px;
            line-height: 35px;
            .yearbox{
                position: absolute;
                background-color: #fff;
                left: -34px;
                top: 15px;
                z-index: 5;
                height: 45px;
            }
        }
    }
    .optionItem{
        background-color: #fff;
        padding: 20px 24px;
        border-radius: 4px;
        .ivu-tabs-bar{
            padding: 0!important;
        }
        .ivu-tabs-tab{
            padding: 8px 10px!important;
        }
        .ivu-tabs-tab-active,.ivu-tabs-tab-focused{
            font-weight: 600!important;
            font-size: 19px;
        }
        .iptbox{
            .ivu-input{
                height: 38px;
                background-color: #EAEDF3;
                border:none;
                padding-left: 10px;
                box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
            }
            .ivu-icon{
                line-height: 38px;
                cursor: pointer;
            }
        }
        .optionbox{
            // display: flex;
            padding: 15px 0;
            .optitem{
                border: 1px solid rgba(107, 108, 111, 0.4);
                text-align: center;
                padding: 3px 0;
                width: 74px;
                display: inline-block;
                box-sizing: border-box;
                font-size: 12px;
                border-radius: 15px;
                margin-right: 22px;
                cursor: pointer;
                // flex: 1;
                // &:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(5){
                //     flex: none;
                //     width: 18%;
                // }
                .ivu-dropdown-rel>a{
                    color: #3E3F42;
                }
            }
            .boldFont{
                border: 1px solid #000;
            }
        }
    }
    .headbox{
        position: relative;
        >span{
            display: inline-block;
            border-radius: 4px;
            margin-right: 10px;
        }
        .miantile{
            max-width: 365px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #1665D8;
            vertical-align: middle;
            cursor: pointer;
            display: inline-block;
            margin-right: 10px;
        }
        .rightIcon{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #939497;
            cursor: pointer;
            .grayIcon{
                font-size: 18px;
                margin-right: 10px;
                &:last-of-type{
                    margin-right: 0;
                }
            }
        }
        .tigspan{
            color: #1665D8;            
            border-radius: 4px;
            border: 1px solid #1665D8;
            padding: 2px 10px;
            vertical-align: middle;
            font-size: 12px;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
        .boldtile{
            color: #1665D8;
            font-size: 16px;
            font-weight: 600;
        }
    }
    .smtile{
        color: #1665D8;
        font-size: 14px;
    }
    .tipbox{
        padding: 10px 0 25px;
        .ratespan{
            background-color: #FEFAEE;
            padding: 2px 5px;
            vertical-align: middle;
            .ivu-rate{
                font-size: 12px;
            }
            .ivu-rate-star{
                margin-right: 0px;
            }
            .ivu-rate-star-full:before{
                color: #FACF55;
            }
        }
        .tipspan{
            font-size: 12px;
            padding: 2px 10px;
            vertical-align: middle;
            margin-right: 15px;
        }
        .green{
            color: #1BBBBB;
            background-color: #E8F8F8;
        }
        .puper{
            color: #6759F3;
            background-color: #EFEEFD;
        }
    }
    .listBox{
        margin-top: 10px;
        padding: 20px 0;
        background-color: #fff;
        border-radius: 4px;
        .tiletip{
            font-size: 12px;
            font-weight: normal;
            color: #9EA0A5;
            margin-bottom: 20px;
            padding: 0 20px;
        }
        .itmcard{
            padding: 0 20px;
            .descbox{
                margin-top: 20px;
                margin-bottom: 20px;
                color: #6B6C6F;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-clamp: 2;
                -webkit-line-clamp: 2;
            }
        }
    }
    .listdetail{
        margin-top: 10px;
        padding: 20px 0;
        background-color: #fff;
        border-radius: 4px;
        >h3{
            cursor: pointer;
            padding: 0 20px;
            .ivu-icon{
                margin-right: 10px;
            }
        }
        .cardetail{
            padding: 0 20px;
            .tip{
                font-size: 14px;
                color: #9EA0A5;
                margin-top: 10px;
            }
            .contdesc{
                font-size: 14px;
                color: #3F4042;
                margin: 30px 0 10px;
            }
            .valdesc{
                color: #6B6C6F;
                margin-bottom: 30px;
                height: 25px;
                overflow: hidden;
            }
            .noHeight{
                height: auto;
                overflow: auto;
            }
            .loadmore{
                text-align: center;
                cursor: pointer;
                margin-top: -20px;
                margin-bottom: 20px;
            }
            .flexbox{
                margin-bottom: 30px;
                display: flex;
                .itemflex{
                    flex: 1;
                    >h4{
                        margin-bottom: 8px;
                    }
                    >p{
                        color: #6B6C6F;
                        .bluespan{
                            padding: 2px 6px;
                            background-color: #F5F6FA;
                            color: #1665D8;
                            border-radius: 2px;
                            font-size: 12px;
                            margin-right: 10px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }
    }
}
.gpbox{
    overflow: hidden;
    max-height: none;
    padding: 5px 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.04);
    border: none;
    .ivu-input-wrapper{
        padding-right: 20px;
    }
    .ivu-input{
        width: 240px;
        float: left;
    }
    .ivu-input-suffix,.ivu-input-icon{
        right: 38px;
    }
    .ivu-poptip-body-content{
        overflow: hidden;
    }
    .ivu-checkbox-group{
        max-width: 278px;
        padding: 4px 1px;
        max-height: 300px;
        text-align: left;
        overflow-y: auto;
        .ivu-checkbox-group-item{
            display: block;
            padding: 2px 0;
        }
    }
    .gp_line{
        margin: 10px auto;
        width: 10%!important;
        min-width: inherit;
    }
    .serhisbox{
        overflow: hidden;
        position: relative;
        max-width: 220px;
        >span{
            float: left;
            font-size: 12px;
        }
        .itmhis{
            padding: 4px 10px;
            padding-right: 5px;
            border-radius: 4px;
            background-color: #F5F6FA;
            margin-right: 10px;
            margin-bottom: 10px;
            b{
                font-weight: normal;
            }
            .ivu-icon{
                font-size: 18px;
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;
            }
        }
        .clearbtn{
            float: none;
            color: #9EA0A5;
            padding: 4px 10px;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
    }
    .btm_option{
        position: relative;
        .allnull{
            float: left;
            border: none;
            font-size: 8px;
            height: auto;
            padding: 2px 10px;
        }
        .sure_btn{
            float: right;
            border: none;
            font-size: 8px;
            background-color: #1665D8;
            color: #fff;
            height: auto;
            padding: 2px 10px;
        }
    }
}
.ivu-tooltip-inner{
    max-width: inherit!important;
}
</style>