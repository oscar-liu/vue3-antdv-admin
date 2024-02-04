<!--
 * @Description: param manage
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
-->
<template>
  <div class="layout-main">

    <div class="contaner-header">
      <div class="hd">
        <div class="tit">参数管理</div>
      </div>
    </div>

    <div class="contaner">
      <div class="data-tables param-contaner">
        <a-tabs
          v-model:activeKey="activeKey"
          :tab-position="mode"
          :style="{ height: '800px' }"
          @tabScroll="callback"
        >
          <a-tab-pane v-for="item in tabs" :key="item.id" :tab="item.name">
            <h3>{{ item.name }}</h3>
            content ...
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsProps } from 'ant-design-vue';
const mode = ref<TabsProps['tabPosition']>('left');
const activeKey = ref(1);
const callback: TabsProps['onTabScroll'] = val => {
  console.log(val);
};
const tabs = [
  { id: 1, name: "基本设置" },
  { id: 2, name: "安全设置" },
  { id: 3, name: "云设置" },
  { id: 4, name: "扩展配置" },
  { id: 5, name: "域名配置" }
]
</script>

<style>
.param-contaner .ant-tabs-nav-list{
  width: 180px;
}

</style>