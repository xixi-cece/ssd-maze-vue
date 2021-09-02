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
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索夏校" icon="ios-search" clearable @on-click="serchData"/>
                            <div class="optionbox">
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showSch" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">学校</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="serval_sch" placeholder="搜索大学" @on-change='serschData' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkschool">
                                                    <Checkbox v-for="(v,i) in schoolarrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showPro" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="serval_pro" placeholder="搜索专业" @on-change='serproData' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkspro">
                                                    <Checkbox v-for="(v,i) in proarrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showTeach" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">授课形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checksteach">
                                                    <Checkbox v-for="(v,i) in teacharrs" :key="i" :label="v.val"></Checkbox>
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
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索竞赛" icon="ios-search" clearable @on-click="serchData"/>
                            <div class="optionbox">
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showGrade" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">级别</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkgrade">
                                                    <Checkbox v-for="(v,i) in gradearrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomPro" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="ser_comPro" placeholder="搜索专业" @on-change='sercomProdata' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="checkscomPro">
                                                    <Checkbox v-for="(v,i) in comProdatas" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomFormat" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">比赛形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkFormat">
                                                    <Checkbox v-for="(v,i) in formatArrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="showcomSystem" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">比赛赛制</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="checkcomSystem">
                                                    <Checkbox v-for="(v,i) in conSystemArrs" :key="i" :label="v.val"></Checkbox>
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
                            <Input v-model="serchcuse" class="iptbox" placeholder="搜索课外活动" icon="ios-search" clearable @on-click="serchData"/>
                            <div class="optionbox">
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showarea" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">区域</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkareas">
                                                    <Checkbox v-for="(v,i) in active_areaArrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="actve_showpro" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">专业方向</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <Input v-model="active_serpro" placeholder="搜索专业" @on-change='active_changepro' clearable suffix="ios-search"/>
                                                <CheckboxGroup v-model="active_checkpro">
                                                    <Checkbox v-for="(v,i) in active_proarrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showform" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">活动形式</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkform">
                                                    <Checkbox v-for="(v,i) in active_formArrs" :key="i" :label="v.val"></Checkbox>
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
                                <span class="optitem">
                                    <Poptip trigger='click' word-wrap :transfer='true' v-model="active_showgold" popper-class='gpbox' placement='bottom'>
                                        <div class="btn_item">含金量</div>
                                        <div slot="content">
                                            <div slot="list">
                                                <CheckboxGroup v-model="active_checkgold">
                                                    <Checkbox v-for="(v,i) in active_goldarrs" :key="i" :label="v.val"></Checkbox>
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
                    <h4 class="tiletip">共{{cardlist.length}}条夏校</h4>
                    <Divider />
                    <div class="itmcard" v-for="(item,j) in cardlist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="item.title">
                                <span class="miantile" style="max-width: 105px;" @click="changeItem(item)">{{item.title}}</span>
                            </Tooltip>
                            <span class="ratespan"><Rate v-model="item.ratenum" disabled/></span>
                            <span class="tipspan green">{{item.tip}}</span>
                            <span class="tipspan puper">{{item.tip}}</span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <div class="tipbox">
                            <span class="tipspan green">{{item.tip}}</span>
                            <span class="tipspan puper">{{item.tip}}</span>
                        </div>
                        <p class="descbox">{{item.desc}}</p>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>夏校地点</b>
                                <span>{{item.activeplace}}</span>
                            </div>
                            <div class="flexitm">
                                <b>夏校形式</b>
                                <span>{{item.activetype}}</span>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>夏校时间</b>
                                <span>{{item.endtime}}</span>
                            </div>
                            <div class="flexitm">
                                <b>截止时间</b>
                                <span>{{item.link}}</span>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv1'&&showDetail">
                    <h3>
                        <Icon type="ios-arrow-back" @click="showList" />
                        <span>详情</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.title">
                                <span class="miantile boldtile">{{curentObj.title}}</span>
                            </Tooltip>
                            <span class="tigspan">官网</span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <p class="tip">{{curentObj.title}}</p>
                        <p class="tip">{{curentObj.title}}</p>
                        <h4 class="contdesc">内容介绍</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>夏校时间</h4>
                                <p>截止日期截止日期</p>
                            </div>
                            <div class="itemflex">
                                <h4>申请截止日期</h4>
                                <p>截止日期截止日期</p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>夏校形式</h4>
                                <p>
                                    <span class="bluespan">研究</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>学科方向</h4>
                                <p>
                                    <span class="bluespan">生物</span>
                                    <span class="bluespan">数学</span>
                                </p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>费用</h4>
                                <p>费用费用</p>
                            </div>
                            <div class="itemflex">
                                <h4>项目时长</h4>
                                <p>项目时长项目时长</p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>年级要求</h4>
                                <p>
                                    <span class="bluespan">9-12</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>年龄要求</h4>
                                <p>
                                    <span class="bluespan">16+</span>
                                </p>
                            </div>
                        </div>
                        <h4 class="contdesc">申请要求</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <h4 class="contdesc">马丽 Insights</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                    </div>
                </div>
                <div class="listBox" v-if="curtTab=='cv2'&&!showDetail">
                    <h4 class="tiletip">共{{cardlist.length}}条竞赛</h4>
                    <Divider />
                    <div class="itmcard" v-for="(item,j) in cardlist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="item.title">
                                <span class="miantile" style="max-width: 105px;" @click="changeItem(item)">{{item.title}}</span>
                            </Tooltip>
                            <span class="ratespan"><Rate v-model="item.ratenum" disabled/></span>
                            <span class="tipspan green">{{item.tip}}</span>
                            <span class="tipspan puper">{{item.tip}}</span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <p class="descbox">{{item.desc}}</p>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛地点</b>
                                <span>{{item.activeplace}}</span>
                            </div>
                            <div class="flexitm">
                                <b>竞赛形式</b>
                                <span>{{item.activetype}}</span>
                            </div>
                        </div>
                        <div class="boxflex">
                            <div class="flexitm">
                                <b>竞赛时间</b>
                                <span>{{item.endtime}}</span>
                            </div>
                            <div class="flexitm">
                                <b>截止时间</b>
                                <span>{{item.link}}</span>
                            </div>
                        </div>
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv2'&&showDetail">
                    <h3>
                        <Icon type="ios-arrow-back" @click="showList" />
                        <span>详情</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.title">
                                <span class="miantile boldtile">{{curentObj.title}}</span>
                            </Tooltip>
                            <span class="tigspan">官网</span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <p class="tip">{{curentObj.title}}</p>
                        <p class="tip">{{curentObj.title}}</p>
                        <h4 class="contdesc">内容介绍</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>竞赛时间</h4>
                                <p>截止日期截止日期</p>
                            </div>
                            <div class="itemflex">
                                <h4>报名截止日期</h4>
                                <p>截止日期截止日期</p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>竞赛形式</h4>
                                <p>
                                    <span class="bluespan">研究</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>学科方向</h4>
                                <p>
                                    <span class="bluespan">生物</span>
                                    <span class="bluespan">数学</span>
                                </p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>奖项级别</h4>
                                <p>
                                    <span class="bluespan">研究</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>赛制</h4>
                                <p>
                                    <span class="bluespan">团队</span>
                                </p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>年级要求</h4>
                                <p>
                                    <span class="bluespan">9-12</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>年龄要求</h4>
                                <p>
                                    <span class="bluespan">16+</span>
                                </p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>兴趣特长</h4>
                                <p>
                                    <span class="bluespan">数理逻辑</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>所需能力</h4>
                                <p>
                                    <span class="bluespan">英语能力</span>
                                </p>
                            </div>
                        </div>
                        <h4 class="contdesc">报名要求</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <h4 class="contdesc">如何准备</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <h4 class="contdesc">马丽 Insights</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <h4 class="contdesc">竞赛冷知识</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                    </div>
                </div>
                <div class="listBox" v-if="curtTab=='cv3'&&!showDetail">
                    <h4 class="tiletip">共{{cardlist.length}}条课外活动</h4>
                    <Divider />
                    <div class="itmcard" v-for="(item,j) in cardlist" :key="j">
                        <div class="headbox">
                            <Tooltip :content="curentObj.title">
                                <span class="miantile" @click="changeItem(item)">{{item.title}}</span>
                            </Tooltip>
                            <span class="tipspan green">{{item.tip}}</span>
                            <span class="ratespan"><Rate v-model="item.ratenum" disabled/></span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <p class="descbox">{{item.desc}}</p>
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
                        <Divider />
                    </div>
                </div>
                <div class="listdetail" v-if="curtTab=='cv3'&&showDetail">
                    <h3>
                        <Icon type="ios-arrow-back" @click="showList" />
                        <span>详情</span>
                    </h3>
                    <Divider />
                    <div class="cardetail">
                        <div class="headbox">
                            <Tooltip :content="curentObj.title">
                                <span class="miantile boldtile">{{curentObj.title}}</span>
                            </Tooltip>
                            <span class="tigspan">官网</span>
                            <Icon type="ios-add-circle-outline" class="addIcon" @click="showPop=true" />
                        </div>
                        <p class="tip">{{curentObj.title}}</p>
                        <p class="tip">{{curentObj.title}}</p>
                        <h4 class="contdesc">内容介绍</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>活动时间</h4>
                                <p>截止日期截止日期</p>
                            </div>
                            <div class="itemflex">
                                <h4>截止日期</h4>
                                <p>截止日期截止日期</p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>活动形式</h4>
                                <p>
                                    <span class="bluespan">研究</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>学科方向</h4>
                                <p>
                                    <span class="bluespan">生物</span>
                                    <span class="bluespan">数学</span>
                                </p>
                            </div>
                        </div>
                        <div class="flexbox">
                            <div class="itemflex">
                                <h4>年级要求</h4>
                                <p>
                                    <span class="bluespan">9-12</span>
                                </p>
                            </div>
                            <div class="itemflex">
                                <h4>年龄要求</h4>
                                <p>
                                    <span class="bluespan">16+</span>
                                </p>
                            </div>
                        </div>
                        <h4 class="contdesc">其他要求</h4>
                        <p class="valdesc">{{curentObj.text}}</p>
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
        username:''
    },
    data() {
        return {
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
            cardlist:[
                {
                    title:'课外活动标题标',
                    tip:'高性价比',
                    ratenum:5,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                },
                {
                    title:'课外活动标题标',
                    tip:'中性价比',
                    ratenum:4,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                },
                {
                    title:'课外活动标题标',
                    tip:'低性价比',
                    ratenum:3,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                }
            ],
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
            oldscharrs:[
                {
                    id:0,
                    val:'American University'
                },
                {
                    id:1,
                    val:'Boston University'
                }
            ],
            schoolarrs:[
                {
                    id:0,
                    val:'American University'
                },
                {
                    id:1,
                    val:'Boston University'
                }
            ],
            showPro:false,
            serval_pro:'',
            checkspro:[],
            oldproarrs:[
                {
                    id:0,
                    val:'University'
                },
                {
                    id:1,
                    val:'Boston'
                }
            ],
            proarrs:[
                {
                    id:0,
                    val:'University'
                },
                {
                    id:1,
                    val:'Boston'
                }
            ],
            showTeach:false,
            teacharrs:[
                {
                    id:1,
                    val:'Coursework'
                },
                {
                    id:2,
                    val:'Research'
                },
                {
                    id:3,
                    val:'Field Work'
                },
                {
                    id:4,
                    val:'Exposure'
                },
                {
                    id:5,
                    val:'Project'
                }
            ],
            checksteach:[],
            showGrade:false,
            checkgrade:[],
            gradearrs:[
                {
                    id:1,
                    val:'国际级'
                },
                {
                    id:2,
                    val:'国家级'
                },
                {
                    id:3,
                    val:'省/州/区域/线上级'
                }
            ],
            showcomPro:false,
            ser_comPro:'',
            checkscomPro:[],
            oldcomProdatas:[
                {
                    id:0,
                    val:'University'
                },
                {
                    id:1,
                    val:'Boston'
                }
            ],
            comProdatas:[
                {
                    id:0,
                    val:'University'
                },
                {
                    id:1,
                    val:'Boston'
                }
            ],
            showcomFormat:false,
            checkFormat:[],
            formatArrs:[
                {
                    id:1,
                    val:'考试'
                },
                {
                    id:2,
                    val:'实验'
                },
                {
                    id:3,
                    val:'面试'
                },
                {
                    id:4,
                    val:'作品'
                },
                {
                    id:5,
                    val:'提名'
                },
                {
                    id:6,
                    val:'表演'
                },
                {
                    id:7,
                    val:'同场竞技'
                }
            ],
            showcomSystem:false,
            checkcomSystem:[],
            conSystemArrs:[
                {
                    id:1,
                    val:'个人'
                },
                {
                    id:2,
                    val:'团体'
                }
            ],
            active_showarea:false,
            active_checkareas:[],
            active_areaArrs:[
                {
                    id:1,
                    val:'中国'
                },
                {
                    id:2,
                    val:'海外'
                },
                {
                    id:3,
                    val:'线上'
                }
            ],
            actve_showpro:false,
            active_serpro:'',
            active_checkpro:[],
            oldactive_proarrs:[
                {
                    id:1,
                    val:'中国'
                },
                {
                    id:2,
                    val:'海外'
                },
                {
                    id:3,
                    val:'线上'
                }
            ],
            active_proarrs:[
                {
                    id:1,
                    val:'中国'
                },
                {
                    id:2,
                    val:'海外'
                },
                {
                    id:3,
                    val:'线上'
                }
            ],
            active_showform:false,
            active_checkform:[],
            active_formArrs:[
                {
                    id:1,
                    val:'中国'
                },
                {
                    id:2,
                    val:'海外'
                },
                {
                    id:3,
                    val:'线上'
                }
            ],
            active_showgold:false,
            active_checkgold:[],
            active_goldarrs:[
                {
                    id:1,
                    val:'高'
                },
                {
                    id:2,
                    val:'中'
                },
                {
                    id:3,
                    val:'低'
                }
            ]





        };
    },
    components: {
        ClassModal
    },
    watch: {
        username:{
            handler(now){
                if(now){
                    // this.getData();
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
        clearschAll(){
            this.checkschool = [];
        },
        clearproAll(){
            this.checkspro = [];
        },
        clearcomProall(){
            this.checkscomPro = [];
        },
        clearteachAll(){
            this.checksteach = [];
        },
        cleargradeAll(){
            this.checkgrade = [];
        },
        clearFormatall(){
            this.checkFormat = [];
        },
        clearcomSystem(){
            this.checkcomSystem = [];
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
        serchData(data){
            
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
                    if((v.val.toLocaleLowerCase()).indexOf(val)!=-1){
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
                    if((v.val.toLocaleLowerCase()).indexOf(val)!=-1){
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
                    if((v.val.toLocaleLowerCase()).indexOf(val)!=-1){
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
                    if((v.val.toLocaleLowerCase()).indexOf(val)!=-1){
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
        },
        changeItem(data){
            this.showDetail = true;
        },
        showList(){
            this.showDetail = false;
        },
        hideschProp(){
            this.showSch = false;
        },
        hideproProp(){
            this.showPro = false;
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
        active_hidearea(){
            this.active_showarea = false;
        },
        active_hidepro(){
            this.actve_showpro = false;
        },
        hideteachProp(){
            this.showTeach = false;
        },
        hidegradeProp(){
            this.showGrade = false;
        },
        active_hideform(){
            this.active_showform = false;
        },
        active_hidegold(){
            this.active_showgold = false;
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
                color: #9EA0A5;
                font-weight: normal;
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
            max-width: 170px;
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
        .tipspan{
            font-size: 12px;
            padding: 2px 10px;
            vertical-align: middle;
        }
        .green{
            color: #1BBBBB;
            background-color: #E8F8F8;
        }
        .puper{
            color: #6759F3;
            background-color: #EFEEFD;
        }
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
        .addIcon{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #1665D8;
            cursor: pointer;
            font-size: 18px;
        }
        .tigspan{
            color: #1665D8;            
            border-radius: 4px;
            border: 1px solid #1665D8;
            padding: 2px 10px;
            vertical-align: middle;
            font-size: 12px;
        }
        .boldtile{
            color: #3F4042;
            font-size: 16px;
            font-weight: 600;
        }
    }
    .tipbox{
        .tipspan{
            font-size: 12px;
            padding: 2px 10px;
            vertical-align: middle;
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
            padding: 0 20px;
            .ivu-icon{
                margin-right: 10px;
                cursor: pointer;
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
                color: #6B6C6F;
                margin: 30px 0 10px;
            }
            .valdesc{
                color: #6B6C6F;
                margin-bottom: 30px;
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
        max-width: 220px;
        padding: 4px 1px;
        max-height: 300px;
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
</style>