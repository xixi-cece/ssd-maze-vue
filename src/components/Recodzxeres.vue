<template>
    <div id="Recodzxeres">
        <Tabs value="red_1" name="red_main">
                <TabPane :label="tabsTabel(1,uslist.length)" name="red_1" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="uslist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <!-- <span class="catchstu" @click="resizeNull(row)" style="margin-right:10px;">重置</span> -->
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div style="display:inline-block;" v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(2,uklist.length)" name="red_2" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="uklist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(3,cdlist.length)" name="red_3" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="cdlist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(4,asialist.length)" name="red_4" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="asialist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(5,auslist.length)" name="red_5" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="auslist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(6,otherslist.length)" name="red_6" tab="red_main">
                    <div class="listbox">
                        <Table :columns="columns" :data="otherslist">
                            <template slot="uvEnName" slot-scope="{row}">
                                <span class="blue">{{row.uvEnName}}</span>
                            </template>
                            <template slot="wlresult" slot-scope="{row}">
                                <Select v-if="!row.wlresult||row.isedit" v-model="row.wlresult" style="width:127px;" :transfer="true" @on-change="changeEdit(row)">
                                    <Option value="null">---</Option>
                                    <Option value="Accept">Accept</Option>
                                    <Option value="Reject">Reject</Option>
                                    <Option value="Waitlist">Waitlist</Option>
                                    <Option value="Defer">Defer</Option>
                                    <Option value="Withdraw">Withdraw</Option>
                                    <Option value="Enrolled">Enrolled</Option>
                                </Select>
                                <span class="catchstu" v-if="row.wlresult&&row.isedit" @click="cachedeferEdit(row)">取消</span>
                                <div v-if="row.wlresult&&!row.isedit">
                                    <span>
                                        <Button
                                            :custom-icon="row.wlresult=='Accept'?'iconfont iconyiluqu':row.wlresult=='Reject'?'iconfont iconbeijujue':
                                            row.wlresult=='Waitlist'?'iconfont iconwait':row.wlresult=='Defer'?'iconfont icondefer':
                                            row.wlresult=='Withdraw'?'iconfont iconchexiao':row.wlresult=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.wlresult=='Accept'?'green':row.wlresult=='Reject'?'red':row.wlresult=='Waitlist'?'yellow':
                                            row.wlresult=='Defer'?'purple':row.wlresult=='Withdraw'?'lblue':row.wlresult=='Enrolled'?'lgreen':''"
                                        >{{row.wlresult}}</Button>
                                        <Icon class="editIcon" custom="iconfont iconbianji1" @click="changeSure(row)" />
                                        <span class="pLine" v-if="row.wlresult=='Waitlist'||row.wlresult=='Defer'">-</span>
                                    </span>

                                    <span v-if="row.wlresult=='Waitlist'">
                                        <Select style="width:127px;" :transfer="true" placeholder="waitlist 结果" v-if="!row.defer||row.isdeferedit" v-model="row.defer" @on-change="changeWait(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="row.defer&&!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="row.defer&&!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'">
                                        <Select style="width:127px;" v-if="row.isdeferedit" placeholder="defer 结果" :transfer="true" v-model="row.defer" @on-change="changeDefer(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Waitlist">Waitlist</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferedit"
                                            :custom-icon="row.defer=='Accept'?'iconfont iconyiluqu':row.defer=='Reject'?'iconfont iconbeijujue':
                                            row.defer=='Waitlist'?'iconfont iconwait':row.defer=='Defer'?'iconfont icondefer':
                                            row.defer=='Withdraw'?'iconfont iconchexiao':row.defer=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.defer=='Accept'?'green':row.defer=='Reject'?'red':row.defer=='Waitlist'?'yellow':
                                            row.defer=='Defer'?'purple':row.defer=='Withdraw'?'lblue':row.defer=='Enrolled'?'lgreen':''"
                                        >{{row.defer}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferedit" custom="iconfont iconbianji1" @click="changedeferSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferedit&&row.defer" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                    
                                    <span v-if="row.wlresult=='Defer'&&row.defer=='Waitlist'">
                                        <span class="pLine" >-</span>
                                        <Select style="width:127px;" v-if="row.isdeferchild" :transfer="true" v-model="row.deferchild" @on-change="changeDeferchild(row)">
                                            <Option value="Accept">Accept</Option>
                                            <Option value="Reject">Reject</Option>
                                            <Option value="Withdraw">Withdraw</Option>
                                            <Option value="Enrolled">Enrolled</Option>
                                        </Select>
                                        <Button
                                            v-if="!row.isdeferchild"
                                            :custom-icon="row.deferchild=='Accept'?'iconfont iconyiluqu':row.deferchild=='Reject'?'iconfont iconbeijujue':
                                            row.deferchild=='Waitlist'?'iconfont iconwait':row.deferchild=='Defer'?'iconfont icondefer':
                                            row.deferchild=='Withdraw'?'iconfont iconchexiao':row.deferchild=='Enrolled'?'iconfont iconxuanzhong':''"
                                            :class="row.deferchild=='Accept'?'green':row.deferchild=='Reject'?'red':row.deferchild=='Waitlist'?'yellow':
                                            row.deferchild=='Defer'?'purple':row.deferchild=='Withdraw'?'lblue':row.deferchild=='Enrolled'?'lgreen':''"
                                        >{{row.deferchild}}</Button>
                                        <Icon class="editIcon" v-if="!row.isdeferchild" custom="iconfont iconbianji1" @click="changelastSure(row)" />
                                        <span class="catchstu" v-if="row.isdeferchild&&row.deferchild" @click="cachedeferEdit(row)">取消</span>
                                    </span>
                                </div>
                            </template>
                        </Table>
                    </div>
                </TabPane>
            </Tabs>
    </div>
</template>

<script>
export default {
    name:'Recodzxeres',
    props:{
        id:''
    },
    data() {
        return {
            menteeId:'',
            columns:[
                {
                    title: '学校名称',
                    slot: 'uvEnName',
                    width: 240
                },
                {
                    title: '申请方向',
                    key: 'majorUN',
                    tooltip:true
                },
                {
                    title: '申请结果',
                    width: 530,
                    slot: 'wlresult'
                }
            ],
            tabsTabel(data,len){
                return (h)=>{
                    return h('span',{
                        style:{
                            
                        }
                    },[
                        h('span',{},data==1?'美国':data==2?'英国':data==3?'加拿大':data==4?'亚洲':data==5?'澳洲':'小众院校'),
                        h('span',{
                            style:{
                                color:'#1665D8',
                                marginLeft:'5px'
                            }
                        },len?'('+len+')':'')
                    ])
                }
            },
            uslist:[],
            uklist:[],
            cdlist:[],
            asialist:[],
            auslist:[],
            otherslist:[]
        };
    },
    components: {

    },
    computed: {

    },
    watch:{
        id:{
            handler(now){
                if(now){
                    this.menteeId = now;
                    this.getData();
                }
            },
            immediate:true,
            deep:true
        }
    },
    created() {
        this.menteeId = this.id;
    },
    mounted() {
        this.getData();
        this.$bus.$on('reloadInfo',res=>{
            this.getData();
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        getData(){
            this.$https.schoozxlist({
                menteeId:this.menteeId
            }).then(res=>{
                if(res&&res.code==200){
                    if(res.data.us){
                        res.data.us.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                                v.iswait
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.uslist = res.data.us;
                    };
                    if(res.data.uk){
                        res.data.uk.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.uklist = res.data.uk;
                    };
                    if(res.data.cd){
                        res.data.cd.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.cdlist = res.data.cd;
                    };
                    if(res.data.asia){
                        res.data.asia.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.asialist = res.data.asia;
                    };
                    if(res.data.aus){
                        res.data.aus.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.auslist = res.data.aus;
                    };
                    if(res.data.others){
                        res.data.others.forEach(v=>{
                            const arr = [];
                            v.major.forEach(itm=>{
                                arr.push(itm.majorEN);
                            });
                            v.majorUN = arr.join(' & ');
                            if(v.wlresult){
                                v.isedit = false;
                            }else{
                                v.isedit = true;
                            };
                            if(v.defer){
                                v.isdeferedit = false;
                            }else{
                                v.isdeferedit = true;
                            };
                            if(v.deferchild){
                                v.isdeferchild = false;
                            }else{
                                v.isdeferchild = true;
                            };
                        });
                        this.otherslist = res.data.others;
                    };
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        resizeNull(data){
            this.$https.editrecodezxlist({
                menteeId:this.menteeId,
                uId:data.uId,
                wlresult:'',
                defer:'',
                deferchild:''
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        changeSure(data){
            data.isedit = true;
            data.isdeferedit = true;
            data.defer = "";
            data.deferchild = "";
        },
        changeEdit(data){
            this.$https.editrecodezxlist({
                menteeId:this.menteeId,
                uId:data.uId,
                wlresult:data.wlresult=='null'?'':data.wlresult,
                defer:data.defer,
                deferchild:data.deferchild
            }).then(res=>{
                if(res&&res.code==200){
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        changeWait(data){
            this.$https.editrecodezxlist({
                menteeId:this.menteeId,
                uId:data.uId,
                wlresult:data.wlresult,
                defer:data.defer,
                deferchild:data.deferchild
            }).then(res=>{
                if(res&&res.code==200){
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        changedeferSure(data){
            data.isdeferedit = true;
        },
        cachedeferEdit(data){
            this.getData();
        },
        changeDefer(data){
            this.$https.editrecodezxlist({
                menteeId:this.menteeId,
                uId:data.uId,
                wlresult:data.wlresult,
                defer:data.defer,
                deferchild:data.deferchild
            }).then(res=>{
                if(res&&res.code==200){
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        changelastSure(data){
            data.isdeferchild = true;
        },
        changeDeferchild(data){
            this.$https.editrecodezxlist({
                menteeId:this.menteeId,
                uId:data.uId,
                wlresult:data.wlresult,
                defer:data.defer,
                deferchild:data.deferchild
            }).then(res=>{
                if(res&&res.code==200){
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        }
    }
};
</script>

<style lang='scss'>
#Recodzxeres{
    .listbox{
        // height: calc(100vh - 320px);
        overflow-y: auto;
        background-color: #fff;        
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        padding: 0 20px 20px;
        .blue{
            color: #1665D8;
        }
        .ivu-table{
            font-size: 14px;
        }
        .ivu-table th{
            background-color: #fff;
            height: 60px;
            line-height: 60px;
            color: #9EA0A5;
            font-weight: normal;
        }
        .green{
            background-color: rgba(53, 170, 69, 0.1);
            border: 1px solid #35AA45;
            color: #35AA45;
        }
        .red{
            background-color: rgba(230, 74, 45, 0.1);
            color: #E64A2D;
            border: 1px solid #E64A2D;
        }
        .yellow{
            background-color: rgba(246, 171, 47, 0.1);
            border: 1px solid #F6AB2F;
            color: #F6AB2F;
        }
        .purple{
            background-color: rgba(103, 89, 243, 0.1);
            border: 1px solid #6759F3;
            color: #6759F3;
        }
        .lblue{
            background-color: rgba(111, 177, 244, 0.1);
            border: 1px solid #6FB1F4;
            color: #6FB1F4;
        }
        .lgreen{
            background-color: rgba(119, 215, 232, 0.1);
            border: 1px solid #77D7E8;
            color: #77D7E8;
        }
        .editIcon{
            font-size: 22px;
            margin-left: 10px;
            cursor: pointer;
        }
        .pLine{
            padding: 0 15px;
        }
        .catchstu{
            margin-left: 10px;
            color: #1665D8;
            cursor: pointer;
        }
    }
}
</style>