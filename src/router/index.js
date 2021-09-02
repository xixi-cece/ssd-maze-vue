import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerPath } from './router';
import { otherPath } from './other';
import store from '../store/index';

Vue.use(VueRouter)

// 解决路由在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
};

let Routers = routerPath.concat(otherPath);
const router = new VueRouter({
  mode: 'history', //去掉url中的#(使用此参数需要慎重，build后项目部署上线刷新会导致找不到路径404等错误，需要nginx配合设置找不到路径时统一回到index.html中)
  base:'/',
  routes: Routers
})

export default router;

/** 
 * to表示即将进入的页面路由，
 * from表示当前导航正要离开的路由
 * next: Function:执行效果依赖 next 方法的调用参数。
 * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
 * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
 * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
 * next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
*/
router.beforeEach((to, from, next) => {
    //console.log(to);
    //console.log(from);
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    };
    //登录状态
    const status = JSON.parse(sessionStorage.getItem('login'));
    const isLogin = store.state.loginstate || status;
    if (isLogin){
        next();
    }else{
        document.title='登录';
        if (to.fullPath == "/Login") {
            next();
        }else if(to.path == "/Bind"){
            next();
        }else if(to.path =='/Forgetpassword'){
            next();
        }else{
            next({path: '/Login'})
        };
    };
});