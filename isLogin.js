router.beforeEach((to, from, next) => {
  // 判断登录状态


  if(API.isLogin() || (to.name == 'login' || to.name == 'signup')){
    if(API.isLogin() && (to.name == 'login' || to.name == 'signup')){
      router.replace({
        path: '/home'
      })
      return
    }
    next();
  }else{
    router.push({
      path: '/login'
    })
  }


})
