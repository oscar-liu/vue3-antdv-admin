<template>
    <div class="contaner-header">
      <div class="hd">
        <div class="tit">工作台</div>
        <div class="user-info">
          <a-avatar src="https://golang.google.cn/images/gophers/motorcycle.svg" :size="60" style="background-color: #98daf7" />
          <div class="info">
            <div class="welcome">早安，吴彦祖，祝你开心每一天！</div>
            <div class="deps">技术研发 | 敏捷开发部</div>
          </div>
        </div>
        <!-- <div class="desc">这是一段副标题的子描述</div> -->
      </div>
    </div>
  
      <div class="contaner">
        <a-row :gutter="20">
          <a-col :span="16">
            <a-card title="待办事项" :bordered="false" class="todo-list">
              <a-steps
                direction="vertical"
                :current="1"
                :items="[
                  {
                    title: 'Finished',
                    description,
                  },
                  {
                    title: 'In Progress',
                    description,
                  },
                  {
                    title: 'Waiting',
                    description,
                  },
                ]"
              ></a-steps>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="更新日志" :bordered="false" class="update-logs">
              <div class="item">
                <div class="txt">v1.0.1 静态布局样式</div>
                <div class="date">2023-07-19 22:38</div>
              </div>
              <div class="item">
                <div class="txt">v1.0.0 项目启动</div>
                <div class="date">2023-07-18 00:00</div>
              </div>
            </a-card>
          </a-col>
        </a-row>
  
      </div>
  </template>
  <script lang="ts" setup>
    const description = 'This is a description.';
  </script>
  
  <style scoped lang="less">
    .user-info{
      display: flex;
      padding-top: 20px;
      .info{
        padding: 5px 20px;
        color: #777;
        font-size: 14px;
      }
      .welcome{
        font-size: 18px;
        font-weight: 400;
        color: #222;
        padding-bottom: 10px;
      }
    }
  
    .update-logs{
      width: 100%;
      .item{
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        .date{
          color: #999;
        }
      }
    }
  
  </style>  