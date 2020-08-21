# vue-element-system

## 简介
---
`vue-element-system`是一个后台前端解决方案，它基于`vue`和`element-ui`实现。

## 前序准备
---
你需要在本地安装 `node` 和 `git`。本项目技术栈基于 `ES2015+`、`vue`、`vuex`、`vue-router` 、`vue-cli` 、`axios` 和 `element-ui`，所有的请求数据都使用`Mock.js`进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 功能
---
```
- public

- src
  - api 接口
  - assets 资源
  - components 公用组件
  - filters 公用过滤器
  - layout 基础路由组件
  - libraries 插件
  - style 样式文件
  - svg svg图
  - tableRowOptions 表格配置文件
  - utils 公用js文件
  - vendor 导出excel配置文件
  - views 路由组件
  - App.vue
  - main.js 路口文件
  - peimission.js 登录权限设置

- .env.development 生产环境基础api

- .env.development 开发环境基础api

- vue.config.js webpack配置文件

```

## 开发
---
```
# 安装依赖
yarn/npm install

# 启动服务
yarn serve/npm run serve

# 打包
yarn build/npm run build

# 代码格式检查
yarn lint/npm run lint

# 代码格式检查并自动修复
yarn lint -- --fix/npm run lint -- --fix
```
