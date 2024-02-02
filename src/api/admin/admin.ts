// menu接口
import request from "@/utils/http/request"


// login
// export const login = (params = {}) => {
//   return request.post('/api/admin/login/index', params)
// }

export const login = (params = {}) => {
  return new Promise((resolve, reject) => {
    const result = {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGl0Y2hpY2xvdWQuY24iLCJhdWQiOiJ1c2VyIiwiaWF0IjoxNzA2ODY2NjgzLCJuYmYiOjE3MDY4NjY2ODMsImV4cCI6MTcwNjkwMjY4MywiZGF0YSI6eyJ1aWQiOjcsInJvbGUiOjEsIm5hbWUiOiJpdCJ9fQ.54-BuYsf3QAhJ-Nho3CAdrSZoaAsbAdJeKXzfsh7TZU",
      "userinfo": {
          "id": 7,
          "name": "it",
          "mobile": "13888888888",
          "username": "13888888888",
          "password": "e4561ca6d285ae997abe8f1f71ba7b54",
          "email": "",
          "dep_id": "2",
          "role": 1,
          "status": 0,
          "is_deleted": 1,
          "created_time": "2023-10-31 01:04:29",
          "updated_time": "2023-12-05 19:01:53"
      },
      "menu": [
          {
              "id": 1,
              "name": "Dashhoard",
              "type": 1,
              "pid": 0,
              "url": "\/dashhoard\/workbench",
              "sort": 0,
              "icon": "dashboard",
              "menu_type": 1,
              "remark": "",
              "status": 0,
              "is_deleted": 0,
              "created_time": null,
              "updated_time": "2023-10-23 10:16:46",
              "children": [
                  {
                      "id": 3,
                      "name": "数据分析",
                      "type": 1,
                      "pid": 1,
                      "url": "\/dashhoard\/analyse",
                      "sort": 0,
                      "icon": "",
                      "menu_type": 1,
                      "remark": "1",
                      "status": 0,
                      "is_deleted": 0,
                      "created_time": "2023-10-21 16:59:46",
                      "updated_time": "2023-11-01 08:42:55"
                  }
              ]
          }
      ],
      "permission": []
    }
    resolve(result)
  })
}