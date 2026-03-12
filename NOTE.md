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

## 02. 完成登录页基础结构与交互

### 解决的问题

- 模板项目还没有一个可用的后台登录页，后续无法在此基础上接入认证流程。
- 开发阶段频繁手输测试账号效率低，需要一个更适合模板项目演示和联调的快捷交互。

### 实现方案

- 基于 `Ant Design` 的 `Card`、`Form`、`Input`、`Button`、`Checkbox` 组合登录页基础结构。
- 提供多组演示账号按钮，点击后自动填充账号和密码。
- 登录提交阶段先模拟异步过程，并在提交完成后跳转到 `/dashboard`，为后续接接口预留替换点。
- 页面样式保持轻量，只使用基础布局和少量容器样式，避免过早投入复杂视觉设计。

### 关键代码片段

```tsx
const demoAccounts: DemoAccount[] = [
  {
    key: 'admin',
    label: '超级管理员',
    username: 'admin',
    password: '123456',
    description: '拥有完整菜单和按钮权限',
  },
]

function handleFillAccount(account: DemoAccount) {
  form.setFieldsValue({
    username: account.username,
    password: account.password,
    remember: true,
  })
  setActiveAccountKey(account.key)
}
```

### 当前收益

- 项目已经具备可交互的登录页原型。
- 后续接入 mock 登录接口、token 持久化和登录守卫时，只需要在现有提交逻辑上继续扩展。

## 03. 完成 404 页面基础结构

### 解决的问题

- 当前 `404` 页面只有简单占位文本，无法满足后台项目对异常页的基础体验要求。
- 未知路由跳转到异常页后，缺少清晰的返回入口，不利于用户继续操作。

### 实现方案

- 使用 `Ant Design` 的 `Result` 组件搭建标准化异常页结构。
- 页面保持简洁，只提供标题、说明文案和两个常用操作按钮。
- 使用独立 `index.scss` 承载页面基础布局样式，避免继续堆积行内样式。

### 关键代码片段

```tsx
<Result
  status="404"
  title="404"
  subTitle="抱歉，你访问的页面不存在或已被移除。"
  extra={(
    <Space>
      <Button type="primary" onClick={() => navigate('/dashboard')}>
        返回首页
      </Button>
    </Space>
  )}
/>
```

### 当前收益

- 项目已经具备可直接使用的基础异常页。
- 后续可以继续在此基础上扩展 `403`、`500` 等其他异常页面。

## 04. 完成管理后台基础布局结构

### 解决的问题

- 当前 `dashboard` 页面是独立路由，缺少后台项目常见的侧边栏、头部和内容容器。
- 后续如果要继续接菜单权限、面包屑、主题切换和用户信息展示，需要先有稳定的布局壳层。

### 实现方案

- 新增 `layout` 目录作为后台外壳层，使用 `Ant Design Layout` 组合侧边栏、头部和内容区。
- 使用 `react-router-dom` 的嵌套路由，让 `/dashboard` 成为布局下的子路由，内容区通过 `Outlet` 展示页面。
- 菜单先保留静态配置，只提供 `dashboard` 入口，避免在这一阶段提前引入动态菜单复杂度。

### 关键代码片段

```tsx
{
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
  ],
}
```

### 当前收益

- 项目已经具备经典管理后台的基础页面骨架。
- 后续可以直接在布局层继续接入菜单权限、面包屑、头部用户区和主题切换。
