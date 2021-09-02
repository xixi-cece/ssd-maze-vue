import api from '../assets/lib/api.js';
/**
 * 发送请求示例：
 * let params = {aa:2};
 * this.$https.getData(params).then(res=>{
 *  console.log(res)
 * });
*/
const users = {
    isBindwx(params){
        return api.getAxios('post','/untoken/if_bind_wx',params);
    },
    Login(params){
        return api.getAxios('post','/login',params);
    },
    getidentity(params){
        return api.getAxios('get','/select_identity',params,sessionStorage.getItem('token'));
    },
    getLogin(params){
        return api.getAxios('get','/get_login_info',params,sessionStorage.getItem('token'));
    },
    checkEmail(params){
        return api.getAxios('post','/untoken/validate_mail',params);
    },
    resetPsw(params){
        return api.getAxios('post','/untoken/reset_pwd',params);
    },
    changeEmail(params){
        return api.getAxios('post','/change_info',params,sessionStorage.getItem('token'));
    },
    resetPassword(params){
        return api.getAxios('post','/reset_password',params,sessionStorage.getItem('token'));
    },
    getwechatInfo(params){
        return api.getAxios('post','/bindauthorized',params)
    },
    bindAccout(params){
        return api.getAxios('post','/bindunionId',params)
    },
    loginOut(params){
        return api.getAxios('get','/logout',params,sessionStorage.getItem('token'));
    },
    lookMenteeInfo(params){
        return api.getAxios('post','/sales/viewcustomer',params,sessionStorage.getItem('token'));
    },
    updateFlowup(params){
        return api.getAxios('post','/sales/followup',params,sessionStorage.getItem('token'));
    },
    addMentee(params){
        return api.getAxios('post','/sales/addcustomer',params,sessionStorage.getItem('token'));
    },
    getnewList(params){
        return api.getAxios('get','/sales/newbie',params,sessionStorage.getItem('token'));
    },
    getsalesList(params){
        return api.getAxios('get','/sales/viewsales',params,sessionStorage.getItem('token'));
    },
    getothsales(params){
        return api.getAxios('get','/untoken/staff',params,sessionStorage.getItem('token'));
    },
    fulldatalist(params){
        return api.getAxios('get','/sales/dealing',params,sessionStorage.getItem('token'));
    },
    startStatus(params){
        return api.getAxios('post','/sales/updatestatus',params,sessionStorage.getItem('token'));
    },
    delsales(params){
        return api.getAxios('delete','/sales/customer',params,sessionStorage.getItem('token'));
    },
    failSign(params){
        return api.getAxios('post','/sales/customer/giveup',params,sessionStorage.getItem('token'));
    },
    restConcat(params){
        return api.getAxios('get','/sales/customer/reassigned',params,sessionStorage.getItem('token'));
    },
    getongoingList(params){
        return api.getAxios('get','/sales/ongoing',params,sessionStorage.getItem('token'));
    },
    getInsurvey(params){
        return api.getAxios('get','/sales/viewsurvey',params,sessionStorage.getItem('token'));
    },
    salesmoney(params){
        return api.getAxios('get','/sales/view_commission',params,sessionStorage.getItem('token'));
    },
    submitmoney(params){
        return api.getAxios('PUT','/sales/submit_commission',params,sessionStorage.getItem('token'));
    },
    getvpmoney(params){
        return api.getAxios('get','/sales/review_commission',params,sessionStorage.getItem('token'));
    },
    changevpmoney(params){
        return api.getAxios('PUT','/sales/modify_commission',params,sessionStorage.getItem('token'));
    },
    submithr(params){
        return api.getAxios('PUT','/sales/submit_hr',params,sessionStorage.getItem('token'));
    },
    getsigning(params){
        return api.getAxios('get','/sales/signing',params,sessionStorage.getItem('token'));
    },
    getdonepayment(params){
        return api.getAxios('get','/sales/donepayment',params,sessionStorage.getItem('token'));
    },
    surereassignsales(params){
        return api.getAxios('post','/sales/assigncustomer',params,sessionStorage.getItem('token'));
    },
    alldonefinsh(params){
        return api.getAxios('get','/sales/alldone',params,sessionStorage.getItem('token'));
    },
    failgivenup(params){
        return api.getAxios('get','/sales/givenup',params,sessionStorage.getItem('token'));
    },
    editcontractinfo(params){
        return api.getAxios('put','/sales/contract',params,sessionStorage.getItem('token'));
    },
    submitInfo(params){
        return api.getAxios('put','/sales/contract_payment',params,sessionStorage.getItem('token'));
    },
    submitpayinfo(params){
        return api.getAxios('post','/sales/newcontract',params,sessionStorage.getItem('token'));
    },
    editcustomer(params){
        return api.getAxios('post','/sales/editcustomer',params,sessionStorage.getItem('token'));
    },
    paydetail(params){
        return api.getAxios('post','/sales/contractdetail',params,sessionStorage.getItem('token'));
    },
    submitconfirmpayment(params){
        return api.getAxios('post','/sales/confirmpayment',params,sessionStorage.getItem('token'));
    },
    newbeeaccount(params){
        return api.getAxios('post','/sales/newbeeaccount',params,sessionStorage.getItem('token'));
    },
    getcontdetail(params){
        return api.getAxios('post','/sales/viewcontract',params,sessionStorage.getItem('token'));
    },
    mysurveystatus(params){
        return api.getAxios('post','/sales/mysurveystatus',params,sessionStorage.getItem('token'));
    },
    backvplist(params){
        return api.getAxios('post','/sales/withdraw_assign',params,sessionStorage.getItem('token'));
    },
    waitsplitlist(params){
        return api.getAxios('get','/sales/unassigned',params,sessionStorage.getItem('token'));
    },
    assignlist(params){
        return api.getAxios('get','/sales/assigned_list',params,sessionStorage.getItem('token'));
    },
    datanumbox(params){
        return api.getAxios('get','/sales/mydashboard',params,sessionStorage.getItem('token'));
    },
    delFlowup(params){
        return api.getAxios('delete','/sales/followup',params,sessionStorage.getItem('token'));
    },
    totalbooklist(params){
        return api.getAxios('post','/sales/achievement',params,sessionStorage.getItem('token'));
    },
    areadata(params){
        return api.getAxios('get','/mapping',params,sessionStorage.getItem('token'));
    },
    addTags(params){
        return api.getAxios('POST','/admin/resources/tag',params,sessionStorage.getItem('token'));
    },
    getTags(params){
        return api.getAxios('get','/admin/resources/tag',params,sessionStorage.getItem('token'));
    },
    getsinglist(params){
        return api.getAxios('post','/sales/total_signed',params,sessionStorage.getItem('token'));
    },
    totalnumlist(params){
        return api.getAxios('post','/sales/total_dealing',params,sessionStorage.getItem('token'));
    },
    goinglist(params){
        return api.getAxios('get','/sales/sidebar',params,sessionStorage.getItem('token'));
    },
    addaccout(params){
        return api.getAxios('post','/sales/newsalesaccount',params,sessionStorage.getItem('token'));
    },
    delaccout(params){
        return api.getAxios('post','/disactive',params,sessionStorage.getItem('token'));
    },
    getperInfo(params){
        return api.getAxios('get','/mentor/view_info',params,sessionStorage.getItem('token'));
    },
    gethighschool(params){
        return api.getAxios('get','/untoken/high_schools',params,sessionStorage.getItem('token'));
    },
    getunderschool(params){
        return api.getAxios('get','/untoken/apply_schools',params,sessionStorage.getItem('token'));
    },
    editperInfo(params){
        return api.getAxios('post','/specialize/renewpersonal',params,sessionStorage.getItem('token'));
    },
    addworkTime(params){
        return api.getAxios('post','/mentor/workinghours',params,sessionStorage.getItem('token'));
    },
    delTime(params){
        return api.getAxios('DELETE','/mentor/workinghours',params,sessionStorage.getItem('token'));
    },
    editWorktime(params){
        return api.getAxios('put','/mentor/workinghours',params,sessionStorage.getItem('token'));
    },
    lookWorks(params){
        return api.getAxios('get','/mentor/view_wage',params,sessionStorage.getItem('token'));
    },
    getstudes(params){
        return api.getAxios('get','/mentor/get_mentees',params,sessionStorage.getItem('token'));
    },
    changementormoney(params){
        return api.getAxios('PUT','/mentor/modify_info',params,sessionStorage.getItem('token'));
    },
    addIntetime(params){
        return api.getAxios('post','/intern/workinghours',params,sessionStorage.getItem('token'));
    },
    delmenTime(params){
        return api.getAxios('DELETE','/intern/workinghours',params,sessionStorage.getItem('token'));
    },
    editIntwork(params){
        return api.getAxios('put','/intern/workinghours',params,sessionStorage.getItem('token'));
    },
    checkWeek(params){
        return api.getAxios('get','/intern/view_wage',params,sessionStorage.getItem('token'));
    },
    getinerInfo(params){
        return api.getAxios('get','/intern/view_info',params,sessionStorage.getItem('token'));
    },
    editinerInfo(params){
        return api.getAxios('get','/intern/renewpersonal',params,sessionStorage.getItem('token'));
    },
    getsuperdata(params){
        return api.getAxios('get','/intern/get_supervisors',params,sessionStorage.getItem('token'));
    },
    changeintmoney(params){
        return api.getAxios('PUT','/intern/modify_info',params,sessionStorage.getItem('token'));
    },
    getadminList(params){
        return api.getAxios('post','/admin/users',params,sessionStorage.getItem('token'));
    },
    adduserinfo(params){
        return api.getAxios('post','/admin/user',params,sessionStorage.getItem('token'));
    },
    eddituserinfo(params){
        return api.getAxios('PUT','/admin/user',params,sessionStorage.getItem('token'));
    },
    resizeStatu(params){
        return api.getAxios('PUT','/admin/user/reset',params,sessionStorage.getItem('token'));
    },
    getWeeks(params){
        return api.getAxios('get','/periods',params,sessionStorage.getItem('token'));
    },
    getmenteelist(params){
        return api.getAxios('post','/admin/mentees',params,sessionStorage.getItem('token'));
    },
    getmentedetail(params){
        return api.getAxios('get','/admin/mentee',params,sessionStorage.getItem('token'));
    },
    getmentors(params){
        return api.getAxios('get','/admin/mentors',params,sessionStorage.getItem('token'));
    },
    sendmentor(params){
        return api.getAxios('PUT','/admin/mentee/match',params,sessionStorage.getItem('token'));
    },
    getresours(params){
        return api.getAxios('get','/resources/search_resource',params,sessionStorage.getItem('token'));
    },
    delresoure(params){
        return api.getAxios('DELETE','/admin/resources/article',params,sessionStorage.getItem('token'));
    },
    delwebcont(params){
        return api.getAxios('DELETE','/admin/resources/website',params,sessionStorage.getItem('token'));
    },
    addwebcont(params){
        return api.getAxios('post','/admin/resources/website',params,sessionStorage.getItem('token'));
    },
    editwebcont(params){
        return api.getAxios('PUT','/admin/resources/website',params,sessionStorage.getItem('token'));
    },
    lookrescore(params){
        return api.getAxios('get','/resources/article',params,sessionStorage.getItem('token'));
    },
    addrescore(params){
        return api.getAxios('post','/admin/resources/article',params,sessionStorage.getItem('token'));
    },
    editrescore(params){
        return api.getAxios('PUT','/admin/resources/article',params,sessionStorage.getItem('token'));
    },
    getMonth(params){
        return api.getAxios('get','/months',params,sessionStorage.getItem('token'));
    },
    chageEffect(params){
        return api.getAxios('PUT','/finance/modify_status',params,sessionStorage.getItem('token'));
    },
    getfanmoney(params){
        return api.getAxios('get','/finance/view_mentors_wage',params,sessionStorage.getItem('token'));
    },
    getfancedata(params){
        return api.getAxios('get','/finance/view_intern_wage',params,sessionStorage.getItem('token'));
    },
    getcurtWeek(params){
        return api.getAxios('get','/periods',params,sessionStorage.getItem('token'));
    },
    changePaid(params){
        return api.getAxios('PUT','/finance/mentor_paid',params,sessionStorage.getItem('token'));
    },
    changeIntpaid(params){
        return api.getAxios('PUT','/finance/intern_paid',params,sessionStorage.getItem('token'));
    },
    setRotate(params){
        return api.getAxios('PUT','/finance/set_exchange_rate',params,sessionStorage.getItem('token'));
    },
    getjzmentor(params){
        return api.getAxios('get','/finance/view_mentors',params,sessionStorage.getItem('token'));
    },
    getintermoney(params){
        return api.getAxios('get','/finance/view_interns_wage',params,sessionStorage.getItem('token'));
    },
    lookmentordetail(params){
        return api.getAxios('get','/finance/view_mentor_wage',params,sessionStorage.getItem('token'));
    },
    getInterlist(params){
        return api.getAxios('get','/finance/view_interns',params,sessionStorage.getItem('token'));
    },
    changeStatu(params){
        return api.getAxios('PUT','/admin/user/modify_status',params,sessionStorage.getItem('token'));
    },
    editmenInfo(params){
        return api.getAxios('PUT','/finance/mentor',params,sessionStorage.getItem('token'));
    },
    addmenInfo(params){
        return api.getAxios('POST','/finance/mentor',params,sessionStorage.getItem('token'));
    },
    editInter(params){
        return api.getAxios('PUT','/finance/intern',params,sessionStorage.getItem('token'));
    },
    addIntermente(params){
        return api.getAxios('POST','/finance/intern',params,sessionStorage.getItem('token'));
    },
    friendback(params){
        return api.getAxios('get','/finance/view_partner_rebate',params,sessionStorage.getItem('token'));
    },
    friendList(params){
        return api.getAxios('get','/finance/partners',params,sessionStorage.getItem('token'));
    },
    editfriend(params){
        return api.getAxios('PUT','/finance/partner',params,sessionStorage.getItem('token'));
    },
    addfriend(params){
        return api.getAxios('POST','/finance/partner',params,sessionStorage.getItem('token'));
    },
    getmoneyList(params){
        return api.getAxios('get','/finance/view_payment',params,sessionStorage.getItem('token'));
    },
    surePaid(params){
        return api.getAxios('get','/finance/payment_confirm',params,sessionStorage.getItem('token'));
    },
    getclient(params){
        return api.getAxios('get','/administration/customer/customers',params,sessionStorage.getItem('token'));
    },
    getclitnfo(params){
        return api.getAxios('get','/administration/customer/info',params,sessionStorage.getItem('token'));
    },
    editclitInfo(params){
        return api.getAxios('PUT','/administration/customer/info',params,sessionStorage.getItem('token'));
    },
    getcoretest(params){
        return api.getAxios('get','/administration/customer/tests',params,sessionStorage.getItem('token'));
    },
    deltestcore(params){
        return api.getAxios('DELETE','/administration/customer/test',params,sessionStorage.getItem('token'));
    },
    looktestcore(params){
        return api.getAxios('get','/administration/customer/test',params,sessionStorage.getItem('token'));
    },
    addtestcore(params){
        return api.getAxios('POST','/administration/customer/test',params,sessionStorage.getItem('token'));
    },
    edittestcore(params){
        return api.getAxios('PUT','/administration/customer/test',params,sessionStorage.getItem('token'));
    },
    getadminrecord(params){
        return api.getAxios('get','/administration/business/records',params,sessionStorage.getItem('token'));
    },
    addrecord(params){
        return api.getAxios('POST','/administration/business/record',params,sessionStorage.getItem('token'));
    },
    editrecord(params){
        return api.getAxios('PUT','/administration/business/record',params,sessionStorage.getItem('token'));
    },
    delrecord(params){
        return api.getAxios('DELETE','/administration/business/record',params,sessionStorage.getItem('token'));
    },
    allextrotlist(params){
        return api.getAxios('get','/administration/business/extra_records',params,sessionStorage.getItem('token'));
    },
    addexrode(params){
        return api.getAxios('POST','/administration/business/extra_record',params,sessionStorage.getItem('token'));
    },
    editexrode(params){
        return api.getAxios('PUT','/administration/business/extra_record',params,sessionStorage.getItem('token'));
    },
    delexrode(params){
        return api.getAxios('DELETE','/administration/business/extra_record',params,sessionStorage.getItem('token'));
    },
    schoolist(params){
        return api.getAxios('get','/administration/mentee/university',params,sessionStorage.getItem('token'));
    },
    schoozxlist(params){
        return api.getAxios('get','/administration/tgMentee/university',params,sessionStorage.getItem('token'));
    },
    schtags(params){
        return api.getAxios('get','/administration/universities/tags',params,sessionStorage.getItem('token'));
    },
    serschlist(params){
        return api.getAxios('get','/administration/universities',params,sessionStorage.getItem('token'));
    },
    prosslist(params){
        return api.getAxios('get','/untoken/majors',params,sessionStorage.getItem('token'));
    },
    sureproess(params){
        return api.getAxios('post','/administration/tgMentee/university',params,sessionStorage.getItem('token'));
    },
    editproess(params){
        return api.getAxios('put','/administration/tgMentee/university',params,sessionStorage.getItem('token'));
    },
    delproess(params){
        return api.getAxios('DELETE','/administration/tgMentee/university',params,sessionStorage.getItem('token'));
    },
    delschool(params){
        return api.getAxios('DELETE','/administration/mentee/university',params,sessionStorage.getItem('token'));
    },
    lookschtags(params){
        return api.getAxios('get','/administration/universities/rounds',params,sessionStorage.getItem('token'));
    },
    addschtag(params){
        return api.getAxios('POST','/administration/mentee/university',params,sessionStorage.getItem('token'));
    },
    upschfile(params){
        return api.getAxios('POST','/administration/mentee/apply_file',params,sessionStorage.getItem('token'));
    },
    getschlists(params){
        return api.getAxios('get','/administration/mentee/apply_file',params,sessionStorage.getItem('token'));
    },
    delschlist(params){
        return api.getAxios('DELETE','/administration/mentee/apply_file',params,sessionStorage.getItem('token'));
    },
    uponlyschfile(params){
        return api.getAxios('POST','/administration/mentee/university_file',params,sessionStorage.getItem('token'));
    },
    upzxfile(params){
        return api.getAxios('POST','/administration/tgMentee/university_file',params,sessionStorage.getItem('token'));
    },
    delzxfile(params){
        return api.getAxios('DELETE','/administration/tgMentee/university_file',params,sessionStorage.getItem('token'));  
    },
    delonlyschfile(params){
        return api.getAxios('DELETE','/administration/mentee/university_file',params,sessionStorage.getItem('token'));
    },
    editrecodelist(params){
        return api.getAxios('PUT','/administration/mentee/update_applyStatus',params,sessionStorage.getItem('token'));
    },
    editrecodezxlist(params){
        return api.getAxios('PUT','/administration/tgMentee/update_applyStatus',params,sessionStorage.getItem('token'));
    },
    getschoolist(params){
        return api.getAxios('GET','/admin/university/type',params,sessionStorage.getItem('token'));
    },
    addschool(params){
        return api.getAxios('POST','/admin/university',params,sessionStorage.getItem('token'));
    },
    getschooldata(params){
        return api.getAxios('GET','/untoken/summer_school_sponsors',params,sessionStorage.getItem('token'));
    },
    getmajordata(params){
        return api.getAxios('GET','/untoken/majors',params,sessionStorage.getItem('token'));
    },
    getagdata(params){
        return api.getAxios('GET','/admin/resources/tag',params,sessionStorage.getItem('token'));
    },
    getsummerdata(params){
        return api.getAxios('POST','/administration/mentee/summer_schools',params,sessionStorage.getItem('token'));
    },
    getcoredata(params){
        return api.getAxios('POST','/administration/mentee/competitions',params,sessionStorage.getItem('token'));
    },
    getactivelist(params){
        return api.getAxios('POST','/administration/mentee/activities',params,sessionStorage.getItem('token'));
    }
};

export default users;