<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="header-wrap">
        <div class="nav">
          <div class="logo"></div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px' }"
            >
              <a-menu-item key="1">Dashboard</a-menu-item>
              <a-menu-item key="2">System</a-menu-item>
              <a-menu-item key="3">CRM</a-menu-item>
            </a-menu>
        </div>
        <div class="info">
          <div class="item">
            <bell-outlined :style="{fontSize: '18px', color: '#fff'}" />
          </div>
          <div class="item act-tools">
            <a-avatar>
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <a-popover title=" " trigger="click">
              <template #content>
                <p><UserOutlined />  个人中心</p>
                <a href="javascript:;" @click="exit"><login-outlined />  退出登录</a>
              </template>
              <div class="exit">Admin <down-outlined size="12" /></div>
            </a-popover>
            
          </div>
        </div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
            v-model:openKeys="state.openKeys"
            v-model:selectedKeys="state.selectedKeys"
            mode="inline"
            :items="menus"
            @click="handleClick"
            :inline-collapsed="state.collapsed"
          />
      </a-layout-sider>
      <!-- side menu -->

      <a-layout style="padding: 0 24px 24px; min-height: 80vh;">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
            <router-view v-slot="{ Component }">
                <keep-alive v-if="$route.meta.keepAlive">
                    <component :is="Component" :key="$route.fullPath"></component>
                </keep-alive>
                <component :is="Component" v-if="!$route.meta.keepAlive"></component>
            </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, reactive, VueElement, h, createVNode } from 'vue';
import { useRouter } from 'vue-router'
import type { MenuProps, ItemType } from 'ant-design-vue';
import { UserOutlined, BellOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import * as icons  from '@ant-design/icons-vue';
import { mockMenu } from '@/mock/menu'

const router = useRouter()

const selectedKeys = ref<string[]>(['2']);

// state 响应式数据
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['1'],
  preOpenKeys: ['1'],
});

// 隐式any索引处理
const handerField =  function <T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

// 创建icon
const CreateIcon = ( iconName: string|any ) => {
  return createVNode( handerField(icons, iconName) );
}

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}


const sideMenus: Array<ItemType> = []
mockMenu.map( (elem:any) => {
    let item = getItem( elem.label, String(elem.key), h( CreateIcon(elem.icon) ), elem.children)
    sideMenus.push(item)
})
const menus: ItemType[] = reactive([...sideMenus])

const handleClick: MenuProps['onClick'] = e => {
  router.push(`${e.item.path}`)
};

</script>
<style scoped>

.site-layout-background {
  background: #fff;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo{
    background-color: #777;
    height: 40px;
    width: 120px;
    margin: 10px;
  }
  .info{
    color: #fff;
    display: flex;
    align-items: center;
  }
}
  .item{
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .act-tools{
    cursor: pointer;
  }
  .nav{
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .module{
      display: flex;
    }
    .link{
      width: 120px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
    .current{
      background-color: #fff;
      color: #000;
    }
  }


</style>
