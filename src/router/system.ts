/*
 * @Description: 系统模块
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
 */

import Layout from '@/views/layout/index.vue'
const routers = [
  {
    path: '/admin',
    name: 'Dashhoard',
    component: Layout,
    redirect: '',
    meta: {
      title: 'Dashhoard',
    },
    children: [
      {
        path: '/dashhoard',
        name: 'dashhoard-workbench',
        meta: {
          title: '工作台',
          // keepAlive: true
        },
        component: () => import('@/views/dashboard/index.vue')
      },
      // {
      //   path: 'system',
      //   meta: {
      //     title: '系统管理'
      //   },
      //   // component: Layout,
      //   redirect: 'system/user',
      //   children: [
      //     {
      //       path: 'user',
      //       name: 'system-user',
      //       meta: {
      //         title: '用户管理'
      //       },
      //       component: () => import('@/views/admin/system/user.vue')
      //     },
      //     {
      //       path: 'role',
      //       name: 'role-manage',
      //       meta: {
      //         title: '角色管理'
      //       },
      //       component: () => import('@/views/admin/system/role.vue')
      //     },
      //     {
      //       path: 'menu',
      //       name: 'menu-manage',
      //       meta: {
      //         title: '菜单管理'
      //       },
      //       component: () => import('@/views/admin/system/menu.vue')
      //     },
      //     {
      //       path: 'dep',
      //       name: 'dep-manage',
      //       meta: {
      //         title: '部门管理'
      //       },
      //       component: () => import('@/views/admin/system/dep.vue')
      //     },
      //     {
      //       path: 'param',
      //       name: 'param-manage',
      //       meta: {
      //         title: '参数管理'
      //       },
      //       component: () => import('@/views/admin/system/param.vue')
      //     },
      //     {
      //       path: 'log/operation',
      //       name: 'log-operation',
      //       meta: {
      //         title: '操作日志'
      //       },
      //       component: () => import('@/views/admin/system/log/operation.vue')
      //     },
      //     {
      //       path: 'log/error',
      //       name: 'log-error',
      //       meta: {
      //         title: '错误日志'
      //       },
      //       component: () => import('@/views/admin/system/log/error.vue')
      //     },
      //   ]
      // },
      // {
      //   path: 'schedule',
      //   meta: {
      //     title: '定时任务'
      //   },
      //   component: import('@/views/admin/schedule/manage.vue'),
      // },
    ]
  },
]

export default {
  routers
}
