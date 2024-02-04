<!--
 * @Description: role manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">角色管理</div>
      </div>
    </div>

    <div class="contaner">

      <div class="data-tables">
        <div class="operation-box">
          <h3>角色列表</h3>
          <a-button type="primary" @click="openModel">
            <template #icon>
              <PlusOutlined />
            </template>
            添加
          </a-button>
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
                <a>授权</a>
                <a @click="edit(record.key)">编辑</a>
                <a @click="delItem">删除</a>
              </a-space>
            </template>
            <template v-else>
              {{ text || ' ' }}
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <a-modal v-model:open="modelOpen" title="添加/编辑角色" width="800px" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item ref="name" label="角色名称" name="name" style="padding-top: 20px;">
          <a-input v-model:value="formState.name"  placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="状态" name="status">
          <a-switch v-model:checked="formState.status" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- end 添加/编辑角色 -->


  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';

interface FormState {
  name: string;
  status: boolean;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  status: true,
});

const modelOpen = ref(false)
const openModel = () => {
  modelOpen.value = true
}
const hideModal = () => {
  modelOpen.value = false
}

const delItem = () => {
  Modal.confirm({
    title: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '一经删除不可撤回',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const columns = [
{
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const dataSource = [
  {
    key: '1',
    name: '平台管理员',
    status: 1,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01'
  },
  {
    key: '2',
    name: '运营人员',
    status: 2,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01'
  },
  {
    key: '3',
    name: '技术部',
    status: 1,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01'
  },
]

const edit = (row: any) => {
  console.log( row )
  modelOpen.value = true
}
</script>