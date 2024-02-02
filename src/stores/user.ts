/*
 * @Description: 用户模块
 * @Author: oscar
 */
import { defineStore } from 'pinia'
import { login } from '../api/admin/admin'

export const userStore = defineStore('user', {
  state: () => ({
    session : JSON.parse(localStorage.getItem('USERINFO')) || {} , // 用户数据
  }),
  actions: {
    // 获取用户信息
    userLogin(params: {} | undefined) {
      return new Promise((resolve, reject) => {
        login(params).then((res:any) => {
          console.log( res )
          if( res.token) {
            // 更新用户资料
            localStorage.setItem('token', res.token)
            localStorage.setItem('USERINFO', JSON.stringify(res))
            this.session  = res
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户退出
    userLogout({ commit }: any ) {
      return new Promise((resolve, reject) => {
        // 根据业务需要，是否通知服务端，清空token有效期
        localStorage.clear()
        resolve({})
      })
    }
  },
  getters: {}
})
