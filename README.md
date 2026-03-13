# React Admin Template

这是一个基于 `React + TypeScript + Vite + Ant Design` 的管理后台模板项目，目标是把管理后台关键且常见的框架层能力做好，让其他项目可以在这套模板基础上直接进行业务开发（也可以根据需要对框架进行改造），而不是重复处理登录、权限、路由、请求封装、主题、国际化等基础工作。

## 技术栈

Vite、React 19、TypeScript、React Router、Zustand、Ant Design、Axios、i18n、Mock.js。

## 当前已完成的核心能力

> 数据和接口都是 mockjs 生成的。

### 登录流程

登录接口获取 token 并持久化，在 App.tsx 根据 token 调接口获取用户信息、菜单树、按钮权限等数据，刷新页面可以重新获取。

### 菜单权限、路由权限

接口返回用户可访问的菜单树，前端根据菜单树使用 `router.patchRoutes()` 动态生成路由。

### 按钮权限

封装了全局的 `PermissionButton`，根据权限码（如 `system:user:delete`）控制按钮是否展示。

### 路由守卫

未登录时跳转登录页，已登录不应继续停留在登录页。

### `axios` 二次封装

请求拦截器携带 token，响应拦截器统一处理错误提示（可选）、登录失效等逻辑。

### 其他

经典后台布局、面包屑、light/dark 主题切换、国际化等。

## 目录结构

```text
├── mock                     # mock 接口与数据
├── src
│   ├── api                  # 接口调用方法
│   ├── assets               # 静态资源与全局主题变量
│   ├── components           # 公共组件
│   ├── hooks                # 初始化与通用 hooks
│   ├── http                 # axios 封装
│   ├── i18n                 # 国际化配置与语言资源
│   ├── layout               # 后台布局
│   ├── pages                # 页面组件
│   ├── router               # 路由与守卫
│   ├── store                # Zustand 状态管理
│   └── types                # 公共类型定义
└── .github/workflows        # GitHub Pages 部署工作流
```

## 部署说明

### 路由模式

为了部署到 GitHub Pages，采用了 `createHashRouter` 路由，以避免 GitHub Pages（纯静态托管环境）在刷新子路由时返回服务器 404。

### mock

- 本地开发时可以在浏览器 `Network` 中看到接口请求。
- GitHub Pages 查看时，不依赖真实后端也可以完成登录和权限演示（虽然 `Network` 中看不到请求）。
