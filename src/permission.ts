import router from '@/router'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  // 白名单不校验是否有权限
  if ( whiteList.includes(to.path) ) {
    next()
  } else {
    if (token) {
      next();
    } else {
      console.error('no Auth')
      next({
        path: '/login'
      });
    }
  }
});

router.afterEach(() => {
})
