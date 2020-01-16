import Vue from 'vue'
import Router from 'vue-router'

import Chat from '@/components/items/chat/chat'
import Demo from '@/components/items/chat/demo'
//我的消息好友首页
import Mymessage from '@/components/items/mymessage/mymessage'
//我的好友
import Myfriend from '@/components/items/myfriend/myfriend'
//搜索好友
import Searchfriend from '@/components/items/searchfriend/searchfriend'
//新的好友
import NewFriend from '@/components/items/newFriend/newFriend'
//好友介绍 fIntroduce
import FIntroduce from '@/components/items/fIntroduce/fIntroduce'
//好友权限
import FPermissions from '@/components/items/fPermissions/fPermissions'
//选择好友
import SelectFriend from '@/components/items/selectFriend/selectFriend'
//分享试题
import ShareTest from '@/components/items/shareTest/shareTest'
//投诉
import Complaint from '@/components/items/complaint/complaint'
//login
//import Login from '@/components/items/login/login'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      // name: 'Mymessage',
      // component: Mymessage
      redirect:'/Mymessage'
    },
    {
      path: '/Mymessage',
      name: 'Mymessage',
      component: Mymessage
    },
    // {
    // path:"/",
    // name:'Login',
    // redirect:'/Login'
    // },
    // {
    //   path:"/Login",
    //   name:'Login',
    //   component:Login
    //   },
    {
      path: '/Chat/:type/:index',
      name: 'Chat',
      component: Chat
    },
   
    {
     path:'/Myfriend',
     name:"Myfriend",
     component:Myfriend
    },
    {
      path:'/Searchfriend',
      name:'Searchfriend',
      component:Searchfriend
    },
    {
      path:'/NewFriend',
      name:'NewFriend',
      component:NewFriend
    },
    {
      path:'/FIntroduce/:id/:userId',
      name:'FIntroduce',
      component:FIntroduce
    },{
      path:'/FPermissions/:toUserId',
      name:'FPermissions',
      component:FPermissions
    },
    {
      path:'/SelectFriend',
      name:SelectFriend,
      component:SelectFriend 
    },
    {
      path:'/ShareTest/:id',
      name:ShareTest,
     component:ShareTest
    },
    {
     path:'/Complaint/:toUserId',
     name:Complaint,
     component:Complaint
    }
  ]
})
