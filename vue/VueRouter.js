import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default [
  {
    path: '/',
    name: 'Hello',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/index',
    component(resolve){
      require(['@/views/home/home-window'], resolve)
    },
    children: [
      {
        path: 'index',
        name: 'home-index',
        component(resolve){
          require(['@/views/home/index'], resolve)
        }
      },
      {
        path: 'myself',
        name: 'home-myself',
        component(resolve){
          require(['@/views/home/myself'], resolve)
        }
      },
      {
        path: 'setting',
        name: 'home-setting',
        component(resolve){
          require(['@/views/home/setting'], resolve)
        }
      }
    ]
  },
  {
    path: '/weixin/homepage',
    name: 'weixin-homepage',
    component(resolve){
      require(['@/views/weixin/homepage/homepage'], resolve)
    }
  },
  {
    path: '/weixin/homepage-addmessage',
    name: 'weixin-addmessage',
    component(resolve){
      require(['@/views/weixin/homepage/homepage-addmessage'], resolve)
    }
  },
  {
    path: '/weixin/chat',
    name: 'weixin-chat', // 单聊
    component(resolve){
      require(['@/views/weixin/chat/chat-by-one'], resolve)
    }
  },
  {
    path: '/weixin/chat-addmessage',
    name: 'weixin-chat-addmessage', // 单聊
    component(resolve){
      require(['@/views/weixin/chat/chat-by-one-send'], resolve)
    }
  },
  {
    path: '/weixin/hongbao',
    name: 'weixin-hongbao', // 单聊
    component(resolve){
      require(['@/views/weixin/hongbao/hongbao'], resolve)
    }
  },
  {
    path: '/weixin/deng-ni', // 等待对方收钱
    name: 'weixin-deng-ni', //
    component(resolve){
      require(['@/views/weixin/zhuanzhang/deng-ni'], resolve)
    }
  },
  {
    path: '/weixin/ni-ok', // 对方已经收钱
    name: 'weixin-ni-ok', // 对方已经收钱
    component(resolve){
      require(['@/views/weixin/zhuanzhang/ni-ok'], resolve)
    }
  },
  {
    path: '/weixin/wo-ok', // 我方已经收钱
    name: 'weixin-wo-ok', // 我方已经收钱
    component(resolve){
      require(['@/views/weixin/zhuanzhang/wo-ok'], resolve)
    }
  },
  {
    path: '/weixin/lingqian', // 零钱
    name: 'weixin-lingqian',
    component(resolve){
      require(['@/views/weixin/lingqian/lingqian'], resolve)
    }
  },
  {
    path: '/login', // 登录
    name: 'login',
    component(resolve){
      require(['@/views/login/login'], resolve)
    }
  },
  {
    path: '/signup', // 登录
    name: 'signup',
    component(resolve){
      require(['@/views/signup/signup'], resolve)
    }
  }

]
