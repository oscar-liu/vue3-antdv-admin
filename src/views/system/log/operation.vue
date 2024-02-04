<!--
 * @Description: menu manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">操作日志</div>
      </div>
    </div>

    <div class="contaner">

      <div class="data-tables">
        <div class="operation-box">
          <h3>日志列表</h3>
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
          <template #bodyCell="{ column, text, record }">
            
            <template v-if="column.dataIndex === 'status'">
              <a-tag
                :color="text === '1' ? 'volcano' : text == 2 ? 'red' : 'green'"
              >
                {{ text == 1 ? "启用" : text == 2 ? "禁用" : "" }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <a-space>
                <a @click="openModel(record)">详细</a>
              </a-space>
            </template>
            <template v-else>
              {{ text || ' ' }}
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <a-modal v-model:open="modelOpen" title="详细日志" width="800px" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <pre id="geoJsonTxt">{{ viewJson }}</pre>
    </a-modal>
    <!-- end 添加/编辑用户 -->

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const modelOpen = ref(false)
const viewJson = ref('')
const openModel = (record: any) => {
  console.log( record )
  viewJson.value = JSON.parse(record.edit_json)
  modelOpen.value = true
}
const hideModal = () => {
  modelOpen.value = false
}

const columns = [
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '功能模块',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const dataSource = [
  {
      "id": 21640,
      "name": "超级管理员",
      "model": "角色管理",
      "type": "修改",
      "create_time": "2023-07-29 09:08:41",
      "ip": "127.0.0.1",
      "edit_json": "{\"id\": 29, \"status\": 3}"
  },
  {
      "id": 21634,
      "name": "超级管理员",
      "model": "角色管理",
      "type": "删除",
      "create_time": "2023-07-29 09:08:41",
      "ip": "127.0.0.1",
      "edit_json": "{\"id\": 29, \"status\": 3}"
  },
  {
      "id": 21630,
      "name": "超级管理员",
      "model": "角色管理",
      "type": "下载",
      "create_time": "2023-07-29 09:08:41",
      "ip": "127.0.0.1",
      "edit_json": "{\"id\": 29, \"status\": 3}"
  }
]

</script>

<style scoped lang="less">
  pre {
    padding: 10px; 
    background-color: #f2f2f2;
    color: #333;
  }

</style>