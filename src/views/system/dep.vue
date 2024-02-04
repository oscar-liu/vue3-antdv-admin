<!--
 * @Description: role manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">部门管理</div>
      </div>
    </div>

    <div class="contaner">

      <div class="data-tables">
        <div class="operation-box">
          <h3>部门列表</h3>
          <a-button type="primary" @click="openModel">
            <template #icon>
              <PlusOutlined />
            </template>
            添加
          </a-button>
        </div>
        <a-table :dataSource="datas.list" :columns="datas.columns">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'status'">
              <a-tag
                :color="text === '0' ? 'green' : text == 1 ? 'red' : 'green'"
              >
                {{ text == 0 ? "启用" : text == 1 ? "禁用" : "" }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <a-space>
                <a @click="edit(column, record)">编辑</a>
                <a @click="delItem(record)">删除</a>
              </a-space>
            </template>
            <template v-else>
              {{ text || ' ' }}
            </template>
          </template>
        </a-table>
      </div>
    </div>

    <a-modal v-model:open="modelOpen" title="添加/编辑部门" width="800px" ok-text="确认" cancel-text="取消" @ok="confirmHandler">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item ref="name" label="部门名称" name="name" style="padding-top: 20px;">
          <a-input v-model:value="formState.name"  placeholder="请输入部门名称" />
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
import { Modal, message } from 'ant-design-vue';

interface FormState {
  id: number,
  name: string;
  status: boolean;
}

const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 13 };
const formState: UnwrapRef<FormState> = reactive({
  id: 0,
  name: '',
  status: true,
});


const datas = reactive({
  list: [],
  columns: [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   key: 'key',
  // },
  {
    title: '部门名称',
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
    dataIndex: 'created_time',
    key: 'create_time',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_time',
    key: 'update_time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  }]
})

const getList = () => {
  const param = {
  }
  datas.list = []
}
getList()

const modelOpen = ref(false)
const openModel = () => {
  formState.id = 0
  formState.name = ""
  formState.status = true
  modelOpen.value = true
}
const confirmHandler = () => {
  modelOpen.value = false
  const param: any = {
    name: formState.name,
    status: formState.status ? 0 : 1
  }
  if(formState.id > 0) {
    param.id = formState.id
  }
  saveDepData(param).then( ()=> {
    message.success('操作成功');
    getList()
  })
}

const delItem = (item: any) => {
  const param = {
    id: item.id
  }
  Modal.confirm({
    title: '确定要删除吗?',
    icon: createVNode(ExclamationCircleOutlined),
    content: '一经删除不可撤回',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      return new Promise((resolve: Function, reject:　Function) => {
        delDepData(param).then( ()=> {
          resolve()
          message.success('操作成功');
          getList()
        }).catch( ()=> {
          reject()
          message.error('操作失败');
        })
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};



const edit = (column: any, values: any) => {
  formState.id = values.id
  formState.name = values.name
  formState.status = Number(values.status) == 0 ? true : false
  modelOpen.value = true
}
</script>