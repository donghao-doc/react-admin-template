# React Admin Template

这是一个基于 `React + TypeScript + Vite + Ant Design` 的管理后台模板项目，目标是把管理后台关键且常见的框架层能力做好，让其他项目可以在这套模板基础上直接进行业务开发（也可以根据需要对框架进行改造），而不是重复处理登录、权限、路由、请求封装、主题、国际化等基础工作。

## 技术栈

Vite、React 19、TypeScript、React Router、Zustand、Ant Design、Axios、i18n、Mock.js。

## 当前已完成的核心能力

> 数据和接口都是 mockjs 生成的，用于联调和演示。

### 登录流程

- 登录接口只返回 `token`，登录成功后写入 `auth store`，并通过 `zustand persist` 持久化。
- 在 `App.tsx` 中，基于 `token` 拉取 `profile`，统一获取用户信息、菜单树和按钮权限。
- 刷新页面时，如果本地有 `token`，会重新请求 `profile` 获取数据。

### 菜单权限、路由权限

- 登录后，将接口返回的用户可访问的菜单树，渲染成左侧菜单。
- 前端根据菜单树，使用 `router.patchRoutes()` 动态生成路由。
- 切换账号时，A 账号有某个路由但 B 账号没有，B 无权限访问时会进入 `403`，真正不存在的路径才会进入 `404`。

### 按钮权限

- `profile` 接口返回了按钮权限列表，存在 store 中。
- 前端封装了全局的 `PermissionButton` 组件，判断传入的权限码（如 `system:user:delete`）是否在权限列表中，进而控制按钮是否展示。

### 路由守卫

- 未登录访问后台页面时，会跳转登录页。
- 已登录访问登录页时，会被重定向回首页。
- 在获取 `profile` 时，路由守卫会统一显示全局 loading，避免页面闪烁或进入 `404`。
- 对动态路由场景添加了访问兜底，确保已失效的历史路由无法被访问。

### `axios` 二次封装

- 请求拦截器自动注入 `Authorization` 头，携带 token。
- 响应拦截器区分了“业务错误”和“HTTP 错误”，并支持按请求配置控制是否展示错误提示。
- 对 `401`（登录失效）做了全局处理，统一清理登录态与 profile，并回到登录页。

### 其他

- 经典后台布局，包括侧边栏、头部、内容区等基础结构。
- 面包屑，展示页面层级。
- 支持 `light / dark` 主题切换，主题状态会被持久化。
- 支持 `zh-CN / en-US` 国际化，框架部分的页面做了国际化处理。

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
