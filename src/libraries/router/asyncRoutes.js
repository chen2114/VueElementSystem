/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */

/**
 * hidden               如果设置为true，则该路由不会显示在侧边栏中（默认为false）
 * componentName        绑定的组件名称
 * meta: {
 *  icon: 'svg-name'    侧栏中的图标
 *  label: 'label'      侧栏显示的名称
 *  requireAuth: true   如果设置为true，则为用户具有该页面的权限（默认为true）
 * }
 */

const layout = () =>
  import(/* webpackChunkName: "layout" */ '@/layout/index')

// 主页
const home = () =>
  import(/* webpackChunkName: "home" */ '@/views/home/index')

// 权限
const role = () =>
  import(/* webpackChunkName: "role" */ '@/views/role/index')

// 图标
const icons = () =>
  import(/* webpackChunkName: "icons" */ '@/views/icons/index')

// 组件
const avatarUpload = () =>
  import(/* webpackChunkName: "components_avatarUpload" */ '@/views/components/avatarUpload')
const countTo = () =>
  import(/* webpackChunkName: "components_countTo" */ '@/views/components/countTo')

// 路由嵌套
const menu1 = () =>
  import(/* webpackChunkName: "nested_menu1" */ '@/views/nested/menu1/index')
const menu11 = () =>
  import(/* webpackChunkName: "nested_menu1_menu1-1" */ '@/views//nested/menu1/menu1-1/index')
const menu12 = () =>
  import(/* webpackChunkName: "nested_menu1_menu1-2" */ '@/views/nested/menu1/menu1-2/index')
const menu121 = () =>
  import(/* webpackChunkName: "nested_menu1_menu1-2_menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1')
const menu122 = () =>
  import(/* webpackChunkName: "nested_menu1_menu1-2_menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2')
const menu2 = () =>
  import(/* webpackChunkName: "nested_menu2" */ '@/views/nested/menu2/index')

// 表格
const table = () =>
  import(/* webpackChunkName: "table" */ '@/views/table/index')

// 图表
const charts = () =>
  import(/* webpackChunkName: "charts" */ '@/views/charts/index')

// excel
const exportExcel = () =>
  import(/* webpackChunkName: "excel_exportExcel" */ '@/views/excel/exportExcel')
const uploadExcel = () =>
  import(/* webpackChunkName: "excel_uploadExcel" */ '@/views/excel/uploadExcel')

export const componentMap = {
  layout,
  // 主页
  home,
  // 权限
  role,
  // 图标
  icons,
  // 组件
  avatarUpload,
  countTo,
  // 嵌套路由
  menu1,
  menu11,
  menu12,
  menu121,
  menu122,
  menu2,
  // 表格
  table,
  // 图表
  charts,
  // excel
  exportExcel,
  uploadExcel
}

export const asyncRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: layout,
    componentName: 'layout',
    children: [
      {
        name: 'home',
        path: 'home',
        component: home,
        componentName: 'home',
        meta: {
          label: '主页',
          icon: 'dashboard',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/role',
    redirect: '/role/index',
    component: layout,
    componentName: 'layout',
    children: [
      {
        name: 'role',
        path: 'index',
        component: role,
        componentName: 'role',
        meta: {
          label: '角色权限',
          icon: 'lock',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/icons',
    redirect: '/icons/index',
    component: layout,
    componentName: 'layout',
    children: [
      {
        name: 'icons',
        path: 'index',
        component: icons,
        componentName: 'icons',
        meta: {
          label: '图标',
          icon: 'icon',
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'components',
    path: '/components',
    redirect: '/components/avatarUpload',
    component: layout,
    componentName: 'layout',
    meta: {
      label: '组件',
      icon: 'component',
      requireAuth: true
    },
    children: [
      {
        name: 'components_avatarUpload',
        path: 'avatarUpload',
        component: avatarUpload,
        componentName: 'avatarUpload',
        meta: {
          label: '头像上传',
          requireAuth: true
        }
      },
      {
        name: 'components_countTo',
        path: 'countTo',
        component: countTo,
        componentName: 'countTo',
        meta: {
          label: '数字滚动',
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'nested',
    path: '/nested',
    redirect: '/nested/menu1/menu1-1',
    component: layout,
    componentName: 'layout',
    meta: {
      label: '路由嵌套',
      icon: 'nested',
      requireAuth: true
    },
    children: [
      {
        name: 'nested_menu1',
        path: 'menu1',
        redirect: '/nested/menu1/menu1-1',
        component: menu1,
        componentName: 'menu1',
        meta: {
          label: 'menu1',
          requireAuth: true
        },
        children: [
          {
            name: 'nested_menu1_menu1-1',
            path: 'menu1-1',
            component: menu11,
            componentName: 'menu11',
            meta: {
              label: 'menu1-1',
              requireAuth: true
            }
          },
          {
            name: 'nested_menu1_menu1-2',
            path: 'menu1-2',
            component: menu12,
            componentName: 'menu12',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: {
              label: 'menu1-2',
              requireAuth: true
            },
            children: [
              {
                name: 'nested_menu1_menu1-2_menu1-2-1',
                path: 'menu1-2-1',
                component: menu121,
                componentName: 'menu121',
                meta: {
                  label: 'menu1-2-1',
                  requireAuth: true
                }
              },
              {
                name: 'nested_menu1_menu1-2_menu1-2-2',
                path: 'menu1-2-2',
                component: menu122,
                componentName: 'menu122',
                meta: {
                  label: 'menu1-2-2',
                  requireAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        name: 'nested_menu2',
        path: 'menu2',
        component: menu2,
        componentName: 'menu2',
        meta: {
          label: 'menu2',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/table',
    redirect: '/table/index',
    component: layout,
    componentName: 'layout',
    children: [
      {
        name: 'table',
        path: 'index',
        component: table,
        componentName: 'table',
        meta: {
          label: '表格',
          icon: 'table',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/charts',
    redirect: '/charts/index',
    component: layout,
    componentName: 'layout',
    children: [
      {
        name: 'charts',
        path: 'index',
        component: charts,
        componentName: 'charts',
        meta: {
          label: '图表',
          icon: 'chart',
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'excel',
    path: '/excel',
    redirect: '/excel/exportExcel',
    component: layout,
    componentName: 'layout',
    meta: {
      label: 'Excel',
      icon: 'excel',
      requireAuth: true
    },
    children: [
      {
        name: 'excel_exportExcel',
        path: 'exportExcel',
        component: exportExcel,
        componentName: 'exportExcel',
        meta: {
          label: '导出 Excel',
          requireAuth: true
        }
      },
      {
        name: 'excel_uploadExcel',
        path: 'uploadExcel',
        component: uploadExcel,
        componentName: 'uploadExcel',
        meta: {
          label: '上传 Excel',
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'external-link',
    path: 'https://gitee.com/chen_project/VueElementSystem',
    component: layout,
    componentName: 'layout',
    meta: {
      label: '外链',
      icon: 'link',
      requireAuth: true
    }
  }
  // { // 注意：404 页面一定要最后加载，否则后面的所以页面都会被拦截到 404
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]
