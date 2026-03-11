## 01. 引入基础路由并配置页面懒加载

### 解决的问题

- 当前项目只有页面占位组件，没有路由系统，页面之间无法按后台项目常见方式组织。
- 需要先把登录页、首页和 404 页纳入统一路由体系，为后续布局、守卫、权限控制打基础。

### 实现方案

- 使用 `react-router-dom` 的 `createBrowserRouter` 统一声明路由。
- 使用 `React.lazy` 和 `Suspense` 对页面组件做路由级懒加载。
- 将应用根组件简化为 `RouterProvider` 挂载点，避免入口层和业务页面耦合。
- 配置 `/` 默认重定向到 `/dashboard`，未知地址统一重定向到 `/404`。

### 关键代码片段

```tsx
const DashboardPage = lazy(() => import('@/pages/dashboard'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: withSuspense(<DashboardPage />),
  },
])
```

### 当前收益

- 项目已经具备基础页面切换能力。
- 后续可以在现有路由表上继续接入布局路由、登录守卫、权限路由和面包屑。
