# vue-element-system

## 简介
---
`vue-element-system`是一个后台前端解决方案，它基于`vue`和`element-ui`实现。它基于`vue`和`element-ui`实现。

## 前序准备
---
你需要在本地安装 `node` 和 `git`。本项目技术栈基于 `ES2015+`、`vue`、`vuex`、`vue-router` 、`vue-cli` 、`axios` 和 `element-ui`，所有的请求数据都使用`Mock.js`进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录
---
``` sh
├── public              # 静态资源
├── src                 # 源代码
    │── api             # 所有请求
    ├── assets          # 主题 字体等静态资源
    ├── components      # 全局公用组件
    ├── filters         # 全局 filter
    ├── layout          # 全局 layout
    ├── libraries       # 插件
    ├── style           # 全局样式
    ├── svg             # svg图
    ├── tableRowOptions # 表格配置文件
    ├── utils           # 全局公用方法
    ├── vendor          # 导出excel配置文件
    ├── views           # views 所有页面
    ├── App.vue         # 入口页面
    ├── main.js         # 入口文件 加载组件 初始化等
    └── peimission.js   # 权限管理
├── .env.development    # 生产环境基础api
├── .env.development    # 开发环境基础api
├── .eslintrc.js        # eslint 配置项
├── .gitignore          # git 配置项
├── babel.config.js     # babel-loader 配置
├── package.json        # package.json
└── vue.config.js       # vue-cli 配置

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
