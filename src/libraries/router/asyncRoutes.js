/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */

/**
 * alwaysShow           如果设置为true，则为根菜单（默认为false）
 * hidden               如果设置为true，则该路由不会显示在侧边栏中（默认为false）
 * componentName        绑定的组件名称
 * label                侧栏显示的名称
 * meta: {
 *  icon: 'svg-name'    侧栏中的图标
 *  requireAuth: true   如果设置为true，则为用户具有该页面的权限（默认为true）
 * }
 */

const layout = () => import('@/layout/index')
// 主页
const home = () => import('@/views/home/index')
// 权限
const role = () => import('@/views/role/index')
// 图标
const icons = () => import('@/views/icons/index')
// 组件
const avatarUpload = () => import('@/views/components/avatarUpload')
const countTo = () => import('@/views/components/countTo')
// 路由嵌套
const menu1 = () => import('@/views/nested/menu1/index')
const menu11 = () => import('@/views//nested/menu1/menu1-1/index')
const menu12 = () => import('@/views/nested/menu1/menu1-2/index')
const menu121 = () => import('@/views/nested/menu1/menu1-2/menu1-2-1')
const menu122 = () => import('@/views/nested/menu1/menu1-2/menu1-2-2')
const menu2 = () => import('@/views/nested/menu2/index')
// 表格
const table = () => import('@/views/table/index')
// 图表
const charts = () => import('@/views/charts/index')
// excel
const exportExcel = () => import('@/views/excel/exportExcel')
const uploadExcel = () => import('@/views/excel/uploadExcel')

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
    name: 'home',
    path: '/',
    redirect: '/home',
    component: layout,
    componentName: 'layout',
    alwaysShow: true,
    label: '主页',
    meta: {
      icon: 'dashboard',
      requireAuth: true
    },
    children: [
      {
        name: 'home_index',
        path: 'home',
        component: home,
        componentName: 'home',
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'role',
    path: '/role',
    redirect: '/role/index',
    component: layout,
    componentName: 'layout',
    alwaysShow: true,
    label: '角色权限',
    meta: {
      icon: 'lock',
      requireAuth: true
    },
    children: [
      {
        name: 'role_index',
        path: 'index',
        component: role,
        componentName: 'role',
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'icons',
    path: '/icons',
    redirect: '/icons/index',
    component: layout,
    componentName: 'layout',
    alwaysShow: true,
    label: '图标',
    meta: {
      icon: 'icon',
      requireAuth: true
    },
    children: [
      {
        name: 'icons_index',
        path: 'index',
        component: icons,
        componentName: 'icons',
        meta: {
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
    label: '组件',
    meta: {
      icon: 'component',
      requireAuth: true
    },
    children: [
      {
        name: 'components_avatarUpload',
        path: 'avatarUpload',
        component: avatarUpload,
        componentName: 'avatarUpload',
        label: '头像上传',
        meta: {
          requireAuth: true
        }
      },
      {
        name: 'components_countTo',
        path: 'countTo',
        component: countTo,
        componentName: 'countTo',
        label: '数字滚动',
        meta: {
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
    label: '路由嵌套',
    meta: {
      icon: 'nested',
      requireAuth: true
    },
    children: [
      {
        name: 'nested_menu1',
        path: 'menu1',
        redirect: '/menu1/menu1-1',
        component: menu1,
        componentName: 'menu1',
        label: 'menu1',
        meta: {
          requireAuth: true
        },
        children: [
          {
            name: 'nested_menu1_menu1-1',
            path: 'menu1-1',
            component: menu11,
            componentName: 'menu11',
            label: 'menu1-1',
            meta: {
              requireAuth: true
            }
          },
          {
            name: 'nested_menu1_menu1-2',
            path: 'menu1-2',
            component: menu12,
            componentName: 'menu12',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            label: 'menu1-2',
            meta: {
              requireAuth: true
            },
            children: [
              {
                name: 'nested_menu1_menu1-2_menu1-2-1',
                path: 'menu1-2-1',
                component: menu121,
                componentName: 'menu121',
                label: 'menu1-2-1',
                meta: {
                  requireAuth: true
                }
              },
              {
                name: 'nested_menu1_menu1-2_menu1-2-2',
                path: 'menu1-2-2',
                component: menu122,
                componentName: 'menu122',
                label: 'menu1-2-2',
                meta: {
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
        label: 'menu2',
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'table',
    path: '/table',
    redirect: '/table/index',
    component: layout,
    componentName: 'layout',
    alwaysShow: true,
    label: '表格',
    meta: {
      icon: 'table',
      requireAuth: true
    },
    children: [
      {
        name: 'table_index',
        path: 'index',
        component: table,
        componentName: 'table',
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    name: 'charts',
    path: '/charts',
    redirect: '/charts/index',
    component: layout,
    componentName: 'layout',
    alwaysShow: true,
    label: '图表',
    meta: {
      icon: 'chart',
      requireAuth: true
    },
    children: [
      {
        name: 'charts_index',
        path: 'index',
        component: charts,
        componentName: 'charts',
        meta: {
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
    label: 'Excel',
    meta: {
      icon: 'excel',
      requireAuth: true
    },
    children: [
      {
        name: 'excel_exportExcel',
        path: 'exportExcel',
        component: exportExcel,
        componentName: 'exportExcel',
        label: '导出 Excel',
        meta: {
          requireAuth: true
        }
      },
      {
        name: 'excel_uploadExcel',
        path: 'uploadExcel',
        component: uploadExcel,
        componentName: 'uploadExcel',
        label: '上传 Excel',
        meta: {
          requireAuth: true
        }
      }
    ]
  }
  // { // 注意：404 页面一定要最后加载，否则后面的所以页面都会被拦截到 404
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]
