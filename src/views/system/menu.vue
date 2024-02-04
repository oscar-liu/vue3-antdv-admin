<!--
 * @Description: menu manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">菜单管理</div>
      </div>
    </div>

    <div class="contaner">
      <div class="data-tables">
        <div class="operation-box">
          <h3>菜单列表</h3>
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
            <template v-else-if="column.dataIndex === 'type'">
              <a-tag
                :color="text === '1' ? 'pink' : text == 2 ? 'purple' : 'orange'"
              >
                {{ text == 1 ? "目录" : text == 2 ? "菜单" : "" }}
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
      </div>
    </div>

    <!-- <a-drawer
      v-model:open="modelOpen"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      width= "800px"
      title="添加/编辑角色"
      placement="right"
    > -->
    <a-modal v-model:open="modelOpen" title="添加/编辑角色" width="800px" ok-text="确认" cancel-text="取消" @ok="hideModal">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="父级菜单" name="roles" style="padding-top: 20px;">
          <a-select v-model:value="formState.pid" placeholder="请选择父级菜单">
            <a-select-option value="1">项级菜单</a-select-option>
            <a-select-option value="2">二级菜单动态渲染</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item ref="name" label="菜单名称" name="name">
          <a-input v-model:value="formState.name"  placeholder="请输入菜单名称" />
        </a-form-item>
        <a-form-item ref="icon" label="Icon" name="icon">
          <a-input v-model:value="formState.icon"  placeholder="请输入antd icon" />
        </a-form-item>
        <a-form-item ref="url" label="路径" name="url">
          <a-input v-model:value="formState.url"  placeholder="请输入路径" />
        </a-form-item>
        <a-form-item ref="sort" label="排序" name="sort">
          <a-input v-model:value="formState.sort"  placeholder="请输入排序" />
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model:value="formState.menu_type">
            <a-radio-button value="1">菜单</a-radio-button>
            <a-radio-button value="2">按钮</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="状态" name="status">
          <!-- <a-switch v-model:checked="formState.status" /> -->
          <a-radio-group v-model:value="formState.status" >
            <a-radio-button value="0">显示</a-radio-button>
            <a-radio-button value="1">隐藏</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- end 添加/编辑菜单 -->
  </div>
</template>



<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { mockMenu } from '@/mock/menu'

interface FormState {
  pid: string;
  name: string;
  icon: string;
  menu_type: number;
  url: string;
  sort: number;
  status: number;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  pid: "",
  name: "",
  icon: "",
  menu_type: 1,
  url: "",
  sort: 10,
  status: 0
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
// {
//     title: 'ID',
//     dataIndex: 'key',
//     key: 'key',
//   },
  {
    title: '菜单名称',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
]

const dataSource = mockMenu

const edit = (row: any) => {
  console.log( row )
  modelOpen.value = true
}
</script>