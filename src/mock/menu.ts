/*
 * @Description: mock 菜单
 * @Author: oscar
 * @Email: jincan.liu@gmail.com
 */
// 模块一 菜单
export const mockMenu = [
  {
    key: "1",
    label: "Dashboard",
    title: "D",
    path: "/admin",
    icon: 'DashboardOutlined',
    sort: 1,
    status: 1,
    type: 1,
    create_time: '2023-01-01 12:00:00',
    children: [
      { key: "3", label: "工作台", path: "/admin", sort: 10, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "31", label: "数据分析", path: "/admin", sort: 11, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
    ],
  },
  {
    key: "2",
    label: "系统管理",
    title: "S",
    path: "/admin/system",
    icon: 'SettingOutlined',
    sort: 20,
    status: 1,
    type: 1,
    create_time: '2023-01-01 12:00:00',
    children: [
      { key: "4", label: "用户管理", path: "/admin/system/user", sort: 20, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "5", label: "角色管理", path: "/admin/system/role", sort: 21, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "6", label: "菜单管理", path: "/admin/system/menu", sort: 22, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "7", label: "部门管理", path: "/admin/system/dep", sort: 22, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "8", label: "参数配置", path: "/admin/system/param", sort: 23, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
      { key: "9", label: "日志管理", path: "", sort: 24, status: 1,  type: 2, create_time: '2023-01-01 12:00:00',
        children: [
          { key: "11",  label: "操作日志", path: "/admin/system/log/operation", sort: 25, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
          { key: "12",  label: "异常日志", path: "/admin/system/log/error", sort: 26, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' }
        ],
      },
    ],
  },
  {
    key: "11",
    label: "定时任务",
    title: "D",
    path: "/admin/schedule",
    icon: 'ScheduleOutlined',
    sort: 30,
    status: 1,
    type: 1,
    create_time: '2023-01-01 12:00:00',
    children: [
      { key: "12", label: "任务管理", path: "/admin/schedule", sort: 11, status: 1,  type: 2, create_time: '2023-01-01 12:00:00' },
    ],
  },
]
