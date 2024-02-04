<!--
 * @Description: user manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">用户管理</div>
      </div>
    </div>

    <div class="contaner">

      <div class="data-tables">
        <div class="operation-box">
          <h3>用户列表</h3>
          <a-button type="primary" @click="openModel">
            <template #icon>
              <PlusOutlined />
            </template>
            添加
          </a-button>
        </div>

        <a-row>
          <a-col :span="6">
            <a-tree 
              v-model:selectedKeys="selectedKeys" 
              :tree-data="treeData" 
              show-icon 
              :class=" 'customer-tree'"
              @select="onSelect"
              default-expand-all>
              <template #icon="{ key, selected }">
                <template v-if="key === '0-0'">
                  <HomeFilled :style="{ fontSize: '16px', color: '#1677ff'}" />
                </template>
                <template v-else>
                  <FolderOpenFilled  v-if="selected" :style="{ fontSize: '16px', color: '#1677ff'}" />
                  <FolderFilled :style="{ fontSize: '16px', color: '#999'}" v-else />
                </template>
              </template>
            </a-tree>
          </a-col>
          <a-col :span="18">
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
                    <a @click="edit(record.key)">编辑</a>
                    <a @click="delItem">删除</a>
                  </a-space>
                </template>
                <template v-else>
                  {{ text || ' ' }}
                </template>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </div>
    </div>

    <a-modal v-model:open="modelOpen" title="添加/编辑角色" width="800px" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-divider />
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="padding: 0;"
      >
        <a-row :gutter="12">
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="realname" label="真实姓名" name="realname">
              <a-input v-model:value="formState.username"  placeholder="请输入真实姓名" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="dep" label="部门" name="dep">
              <a-select
                v-model:value="value1"
                :size="size"
                style="width: 200px"
                :options="options"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="手机号码" name="name">
              <a-input v-model:value="formState.username"  placeholder="请输入手机号码" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="邮箱" name="name">
              <a-input v-model:value="formState.username"  placeholder="请输入邮箱" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="用户名" name="name">
              <a-input v-model:value="formState.username"  placeholder="请输入登录用户名" />
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="密码" name="name">
              <a-input v-model:value="formState.username"  placeholder="请输入登录密码" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="用户名" name="name">
              <a-select v-model:value="formState.roles" placeholder="请选择角色">
                <a-select-option value="1">超级管理员</a-select-option>
                <a-select-option value="2">技术部</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <a-form-item ref="username" label="密码" name="name">
              <a-radio-group v-model:value="formState.status" name="radioGroup">
                <a-radio value="1">正常</a-radio>
                <a-radio value="2">停用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider />
      </a-form>
    </a-modal>
    <!-- end 添加/编辑用户 -->

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { ExclamationCircleOutlined, HomeFilled, FolderFilled, FolderOpenFilled } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';

interface FormState {
  username: string;
  realname: string;
  password: string;
  status: boolean;
  roles: Array<number>;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  username: '',
  realname: '',
  password: '',
  status: true,
  roles: []
});

const modelOpen = ref(false)
const openModel = () => {
  modelOpen.value = true
}
const hideModal = () => {
  modelOpen.value = false
}

const treeData: TreeProps['treeData'] = [
  {
    title: '深圳市荔枝云科技有限公司',
    key: '0-0',
    children: [
      { title: '深圳总部', key: '0-0-0' },
      { 
        title: 'IT技术部', 
        key: '0-0-1', 
        children: [
          { title: 'cto', key: '0-0-1-0' },
          { title: 'joey', key: '0-0-1-1' },
        ], 
      },
    ],
  },
];
const selectedKeys = ref(['0-0-0']);

const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
};


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
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '姓名',
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
    title: '最后登录IP',
    dataIndex: 'login_ip',
    key: 'login_ip',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const dataSource = [
  {
    key: '1',
    username: "admin",
    name: '超级管理员',
    status: 1,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01',
    login_ip: '127.0.0.1'
  },
  {
    key: '2',
    username: "oscar",
    name: '开发人员',
    status: 2,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01',
    login_ip: '127.0.0.1'
  },
  {
    key: '3',
    username: "joey",
    name: '李子七',
    status: 1,
    create_time: '2023-07-19 23:00:01',
    update_time: '2023-07-19 23:00:01',
    login_ip: '127.0.0.1'
  },
]

const edit = (row: any) => {
  console.log( row )
  modelOpen.value = true
}
</script>

<style lang="less">
.customer-tree {
  .ant-tree-treenode {
    padding: 4px 0 6px 0;
  }
  .ant-tree-node-selected{
    background-color: #fff !important;
  }
}
</style>