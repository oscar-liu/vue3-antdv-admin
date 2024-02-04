<!--
 * @Description: 任务管理
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">任务管理</div>
        <!-- <div class="desc">这是一段副标题的子描述</div> -->
      </div>
    </div>

    <div class="contaner">
      <div class="search-box">
        <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form"
          :model="formState"
          @finish="onFinish"
        >
          <a-row :gutter="24">
            <a-col :span="8">
              <div class="form-item">
                <div class="label">Jobs名称</div>
                <a-input v-model:value="formState.name" placeholder="请输入"></a-input>
              </div>
            </a-col>
            <a-col :span="12">
              <a-button style="margin: 0 8px" @click="() => resetFields()">重置</a-button>
              <a-button type="primary" html-type="submit">搜索</a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- end search-box -->

      <div class="data-tables">
        <div class="operation-box">
          <h3>Jobx管理</h3>
          <a-button type="primary">
            <template #icon>
              <PlusOutlined />
            </template>
            新建
          </a-button>
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'name'">
              {{ text || ' ' }}
            </template>
            <template v-if="column.dataIndex === 'type'">
              <a-tag
                :color="text === '1' ? 'volcano' : text == 2 ? 'geekblue' : 'green'"
              >
                {{ text == 1 ? "接口" : text == 2 ? "函数" : "脚本" }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
              <a @click="edit(record.key)">Edit</a>
            </template>
          </template>
        </a-table>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
const formRef = ref<FormInstance>();
const formState = reactive({
  name: ''
});
const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
};
const resetFields = () => {

}

const columns = [
  {
    title: 'Job名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '执行目标',
    dataIndex: 'target',
    key: 'target',
  },
  {
    title: '规则',
    dataIndex: 'rule',
    key: 'rule',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
]

const dataSource = [
  {
    key: '1',
    name: '接口测试',
    type: 1,
    target: 'http://localhost:8000',
    rule: "0/5 * * * *"
  },
  {
    key: '2',
    name: 'RPC函数测试',
    type: 2,
    target: 'ExampleTest',
    rule: "0/5 * * * *"
  },
]

const edit = (row: any) => {
  console.log( row )
}
</script>