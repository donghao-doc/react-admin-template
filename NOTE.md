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

## 05. 完成认证状态骨架搭建

### 解决的问题

- 项目还没有统一的认证状态承载位置，后续无法稳定接入登录、登出、路由守卫和权限请求。
- token 如果只散落在页面组件里，后续扩展到 `axios`、菜单权限和用户信息时会很快失控。

### 实现方案

- 在 `src/store/auth.ts` 中就近定义认证 store 的私有类型，避免把只在单个模块内使用的类型抽离到全局 `types` 目录。
- 在 `src/store/auth.ts` 中基于 `Zustand` 实现认证 store，只承载 `token` 和最基础的认证行为。
- 使用 `Zustand` 官方 `persist` 中间件持久化 token，避免手动读写 `localStorage`。

### 关键代码片段

```ts
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',
      setToken(token) {
        set({ token })
      },
      clearToken() {
        set({ token: '' })
      },
    }),
    {
      name: AUTH_TOKEN_STORAGE_KEY,
      partialize: (state) => ({ token: state.token }),
    },
  ),
)
```

### 当前收益

- 项目已经具备统一的 token 状态入口。
- `types` 目录可以继续保持“只放公共类型”的边界。
- 后续接 mock 登录接口、请求拦截器和路由守卫时，可以直接复用当前 store 继续扩展。

## 06. 补充公共类型并准备 mock 原始数据

### 解决的问题

- 项目后续要接登录、用户信息、菜单树、按钮权限等 mock 接口，但目前缺少统一的公共领域类型。
- 如果在写 mock 接口时临时拼接数据结构，后面很容易出现 store、接口、页面之间字段定义不一致的问题。

### 实现方案

- 在 `src/types` 中补充公共领域类型，只放会被多个模块复用的定义，例如登录参数、用户信息、菜单树、权限码等。
- 新增 `mock/data.ts`，集中维护演示账号、token、用户信息、菜单树、按钮权限这类基础原始数据。
- mock 数据按照“账号 -> token -> 用户/菜单/权限”关系组织，便于后续直接拼装 mock 接口。

### 关键代码片段

```ts
export const mockMenusByRole: Record<UserRole, MenuItem[]> = {
  admin: [
    {
      key: 'dashboard',
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        title: '工作台',
        icon: 'DashboardOutlined',
      },
    },
  ],
}
```

### 当前收益

- 项目已经具备后续 mock 接口开发所需的数据基础。
- `types` 目录的职责进一步明确为“公共领域类型定义”。

## 07. 接入基础 mock 接口能力

### 解决的问题

- 虽然已经准备了 mock 原始数据，但浏览器里还没有真实可请求的 mock 接口。
- 后续登录、获取用户信息、菜单树、按钮权限等流程，必须先有一层稳定的接口入口，才能在 `Network` 中看到请求并逐步替换页面逻辑。

### 实现方案

- 在 `mock/index.ts` 中基于 `vite-plugin-mock` 定义 mock 接口列表。
- 在接口响应里结合 `mockjs` 生成统一的响应结构。
- 在 `vite.config.ts` 中接入 `viteMockServe`，仅在开发环境启用 mock 服务。

### 关键代码片段

```ts
{
  url: '/api/auth/login',
  method: 'post',
  response: ({ body }) => {
    const matchedAccount = mockAccounts.find((account) => {
      return account.username === body.username && account.password === body.password
    })

    if (!matchedAccount) {
      return createErrorResponse('账号或密码错误', 10001)
    }

    return createSuccessResponse({
      token: matchedAccount.token,
    })
  },
}
```

### 当前收益

- 开发环境已经具备真实可访问的认证类 mock 接口。
- 后续可以直接把登录页、用户信息加载、菜单和按钮权限请求接到当前 mock 接口上。

## 08. 补充 401 全局处理

### 解决的问题

- 当前请求层虽然已经具备统一错误提示能力，但 token 失效后还不会自动清理认证状态并跳回登录页。
- 如果把 401 处理散落到每个接口或页面里，后续接入菜单、用户信息、权限接口后会产生大量重复逻辑。

### 实现方案

- 在 `http` 响应拦截器中统一拦截业务错误码 `401` 和 HTTP 状态码 `401`。
- 触发 401 时统一清空 `auth store` 中的 token，并跳转到登录页。
- 增加简单的重复跳转保护，避免多个接口同时 401 时触发多次路由跳转。

### 当前收益

- token 失效后的退出登录行为已经具备统一入口。
- 后续页面和业务接口不需要再分别处理基础的 401 跳转逻辑。

## 09. 定义认证相关 API 方法

### 解决的问题

- 当前虽然已经有 `http` 封装和 mock 接口，但页面层如果直接写请求路径，会很快把接口地址和参数结构散落到各处。
- 后续登录页、用户信息初始化、菜单权限加载都需要一层稳定的 API 方法封装作为调用入口。

### 实现方案

- 在 `src/api/auth.ts` 中补充与当前 mock 接口一一对应的认证类 API 方法。
- API 方法统一基于现有 `http` 封装实现，不重复处理 token、错误提示和 401 逻辑。
- 新增 `src/api/index.ts` 统一导出，便于页面和 store 后续直接引用。

### 当前收益

- 页面层后续可以直接调用现成的 API 方法，不需要关心接口路径细节。
- 认证、菜单、权限相关请求已经具备统一的调用入口。

## 10. 合并登录初始化接口为 profile

### 解决的问题

- 登录后原本需要额外请求用户信息、菜单树、按钮权限三份数据，初始化链路偏长。
- 这三份数据本质上都属于登录上下文，拆成多个接口会让前端初始化流程和加载状态处理更分散。

### 实现方案

- 将 `userInfo`、`menus`、`permissions` 合并为一个 `profile` 接口返回。
- 在 `src/types/auth.ts` 中新增 `AuthProfile` 类型，明确登录后上下文数据结构。
- 在 mock 数据层中聚合 `mockProfilesByToken`，并将 mock 接口收敛为 `GET /api/auth/profile`。
- 在 API 层同步收敛为 `getProfileApi`，作为登录后初始化数据的统一入口。

### 当前收益

- 登录后的初始化请求从三次收敛为一次。
- 后续接登录页和应用初始化时，只需要围绕一份 `profile` 数据做状态落库和页面渲染。

## 11. 收拢认证链路公共类型

### 解决的问题

- `UserInfo`、`MenuItem`、`PermissionCode` 等类型虽然被拆在多个文件中，但当前都只服务于同一条认证初始化链路。
- 在项目还比较早期时把这些类型分散到多个文件，阅读和维护成本会高于实际收益。

### 实现方案

- 将 `user.ts`、`permission.ts` 中的类型定义统一收拢到 `src/types/auth.ts`。
- `src/types/index.ts` 只保留真正需要的统一导出入口。
- 删除已经没有必要单独存在的类型文件，保持 `types` 目录结构简洁。

### 当前收益

- 当前认证链路相关类型已经集中在一个文件中，更方便统一维护。
- 后续如果权限或菜单领域真正复杂起来，再从 `auth.ts` 中拆分出去也更自然。

## 12. 接通登录与 profile 初始化链路

### 解决的问题

- 当前登录页虽然已经具备界面和交互，但还没有真正接入登录接口，也不会把 token 和登录上下文写入状态。
- 页面刷新后虽然 token 能通过 `persist` 恢复，但还缺少自动重新拉取 `profile` 的初始化逻辑。

### 实现方案

- 新增 `profile store`，统一承载 `userInfo`、`menus`、`permissions` 以及 `profileStatus`。
- 在 `src/hooks/init-profile.ts` 中实现 `useInitProfile`，基于 token 自动拉取 `profile` 并写入 store。
- 登录页改为调用 `loginApi`，成功后写入 token，并清空旧的 profile 以触发新的初始化流程。
- 在 `App.tsx` 中挂载 `useInitProfile`，让跳转后和刷新页面后的初始化逻辑保持一致。

### 当前收益

- 登录链路已经接通到真实的 `http + mock` 接口。
- 页面刷新后能够基于已持久化的 token 自动重新拉取登录上下文数据。

## 13. 接通布局头部用户区交互

### 解决的问题

- 布局头部目前仍然写死为“演示账号”，没有复用真实的登录上下文数据。
- 退出登录按钮直接暴露在头部，既不够收敛，也缺少误操作防护。

### 实现方案

- 使用 `profile store` 中的 `userInfo.nickname` 替换头部静态文案。
- 将头像和昵称区域改为点击触发的下拉菜单，退出登录收敛到菜单项中。
- 点击退出登录后使用 `Modal.confirm` 二次确认，确认后清空认证状态和登录上下文，并跳转到登录页。

### 当前收益

- 布局头部已经和当前登录用户数据打通。
- 用户退出登录流程具备更符合后台产品习惯的交互形式。

## 14. 增加基础路由守卫

### 解决的问题

- 当前虽然已经有 token、profile 和 401 全局处理，但后台路由本身还没有访问控制。
- 刷新页面时如果 token 已恢复但 profile 仍在初始化，就可能出现页面先渲染、再等待数据的状态不一致问题。

### 实现方案

- 新增基础路由守卫文件，在路由层区分受保护路由和公共路由。
- 受保护路由在无 token 时直接跳转登录页；有 token 但 profile 尚未初始化完成时先展示加载态。
- 登录页增加公共路由守卫，已登录用户不再停留在登录页。

### 当前收益

- 未登录访问后台页时会被统一拦截到登录页。
- 刷新页面时会等待 profile 初始化完成后再进入后台页面。

## 15. 接入动态菜单渲染

### 解决的问题

- 当前布局左侧菜单仍然是静态写死的，无法体现不同账号的菜单差异。
- `profile` 中已经有菜单树数据，但还没有真正驱动布局渲染。

### 实现方案

- 在布局层直接读取 `profile store` 中的 `menus`，将菜单树转换成 `antd Menu` 的 `items` 结构。
- 基于菜单元信息中的 `icon` 字符串做本地图标映射，保持 mock 数据与 UI 渲染解耦。
- 根据当前路由路径匹配菜单节点，用于同步左侧选中态和头部标题。

### 当前收益

- 左侧菜单已经能够根据当前登录用户的 `profile.menus` 动态渲染。
- 头部标题不再写死，而是会跟随当前菜单变化。

## 16. 根据菜单动态生成前端路由

### 解决的问题

- 现有动态菜单中部分路径还没有对应页面和前端路由，点击后会直接进入 404。
- 如果完全依赖菜单数据决定页面组件，会让前端页面归属变得不清晰，不利于模板项目维护。

### 实现方案

- 先补齐当前菜单对应的占位页面，例如 `system/user` 和 `content`。
- 在路由层新增本地路由组件注册表，由前端维护 `path -> component` 的映射关系。
- 保持 `router` 为单例实例，在 `App.tsx` 中监听 `profile.menus` 变化，并通过 `router.patchRoutes` 动态追加菜单子路由。
- 仅根据叶子菜单生成实际可访问的子路由，避免目录型菜单被错误挂成页面路由。
- 使用本地去重集合避免重复 patch 相同路由。
- 为动态路由增加轻量访问校验，防止切换账号后历史 patch 过的路由继续被访问。

### 方案对比

- 方案一：根据 `menus` 重建 router 实例
- 优点：数据流更单向，逻辑更直白；不需要维护额外的全局去重状态；切换账号后不会残留旧动态路由。
- 缺点：每次菜单变化都会重新创建 router 实例，但在当前模板项目里这部分成本可接受。
- 方案二：保持单例 router，通过 `router.patchRoutes` 增量追加路由
- 优点：更适合需要长期维持单例 router，并持续增量补路由的场景，也更接近 `smart-zone` 的实现方式。
- 缺点：天然更适合“追加”而不适合“删除”，切换账号后容易留下历史动态路由，需要额外补访问校验或其他清理机制。
- 当前结论：结合本项目当前希望保持单例 `router`、并在 `http/utils` 这类组件外模块中继续统一使用 `router.navigate(...)` 的诉求，最终选择 `router.patchRoutes` 方案。
- 补充判断：`router.patchRoutes` 的工程优势在于 router 实例稳定，组件内外都能围绕同一个 router 完成跳转；相应地，需要接受并处理“动态路由只增不减”带来的残留问题。

### 当前收益

- 当前 mock 菜单对应的页面已经都有前端路由承接，不会再因缺少页面直接跳到 404。
- 菜单是否展示与路由是否启用保持一致，同时页面组件仍由前端统一维护。
- 通过单例 `router` 可以在组件内外统一使用 `router.navigate(...)` 进行页面跳转。
- 通过访问校验可以拦住历史残留的动态路由，避免切换账号后低权限用户误访问旧页面。

## 17. 修复登录成功提示与退出登录跳转问题

### 解决的问题

- 登录成功后页面直接跳转到 `dashboard`，缺少明确的成功反馈。
- 退出登录时如果先清空 token 和菜单，当前后台路由可能会立即失配，导致页面先落到 `404`。

### 实现方案

- 在登录页调用 `loginApi` 成功后，显式弹出一次 `message.success('登录成功')`。
- 退出登录时继续先清空认证状态和 `profile`，但跳转登录页改为浏览器级 `window.location.replace('/login')`，避免在 router 重新创建的瞬间使用已经失效的后台路由。

### 当前收益

- 登录成功后有明确反馈，交互更完整。
- 退出登录时能够稳定回到登录页，不会再先跳到 `404`。

## 18. 收敛 router 目录结构

### 解决的问题

- 当前 `router` 目录中的拆分粒度偏细，阅读时需要在多个文件之间来回跳转。
- 虽然动态路由能力已经具备，但作为模板项目，过细的文件拆分会提高理解和维护成本。

### 实现方案

- 保留 `route-map.tsx` 作为页面组件注册表。
- 将动态路由生成、菜单叶子节点处理和 `patchRoutes` 注入逻辑统一收回 `router/index.tsx`。
- 将 `MenuRouteAccess` 收敛到 `router/guard.tsx`，让守卫相关组件集中管理。

### 当前收益

- 当前 `router` 目录只保留入口、守卫、注册表三类核心文件，结构更直观。
- 在保留现有动态路由能力的前提下，减少了文件切换成本和维护压力。

## 19. 打印当前生效路由表

### 解决的问题

- 动态菜单路由是通过 `router.patchRoutes` 增量注入的，开发时不容易直观看到当前到底有哪些路由已经生效。
- 登录成功、退出登录或账号切换后，菜单变化会导致生效路由变化，需要一个统一的观测入口。

### 实现方案

- 在 `router/index.tsx` 中统一维护静态路由和当前菜单对应的动态路由路径。
- 每次菜单变更触发 `addMenuRoutes` 时，在控制台使用 `console.groupCollapsed + console.table` 打印当前生效路由表。
- 路由表区分 `static` 和 `dynamic` 来源，便于排查当前某条路由是固定路由还是菜单追加路由。

### 当前收益

- 登录成功、退出登录、切换账号等导致菜单变化时，都能在控制台看到当前最新的生效路由表。
- 调试动态路由问题时，不需要再手动猜测当前路由注入状态。

## 20. 修复地址栏直接访问动态路由落入 404 的问题

### 解决的问题

- 当前动态路由通过 `router.patchRoutes` 在 `useEffect` 中追加。
- 当用户直接修改浏览器地址栏并访问 `/content` 这类动态路由时，Router 会先按未 patch 完成的静态路由表进行匹配，导致先进入 `404`。

### 实现方案

- 在 `App.tsx` 中增加 `isRouterReady` 状态。
- 已登录时，先等待 `profile` 初始化完成，再执行 `addMenuRoutes(menus)`，并在动态路由同步完成后才渲染 `RouterProvider`。
- 未登录时不阻塞应用渲染，让登录页和公共路由保持原样工作。

### 当前收益

- 刷新页面或直接输入动态路由地址时，不会再因为动态路由注入时机过晚而先进入 `404`。
- `router.patchRoutes` 方案下，动态路由的初始化时序更稳定。

## 21. 增加 403 页面和页面级权限反馈

### 解决的问题

- 之前后台项目只能区分“页面存在”与“不存在”，但无法明确表达“页面已存在，只是当前账号没有权限访问”。
- 对于已知页面路径，如果当前账号无对应菜单权限，直接落到 `404` 会让权限语义不够清晰。

### 实现方案

- 新增 `403` 页面，用于承接后台权限不足场景。
- 在路由守卫层新增后台布局下的兜底判断：如果当前路径属于系统已知页面，但不在当前账号可访问菜单中，则跳转到 `403`；真正未知的路径继续跳转到 `404`。
- 已经 patch 过的动态路由在切换账号后如果权限失效，也改为跳转 `403`，保证反馈一致。

### 当前收益

- 页面级权限不足和页面不存在已经能明确区分。
- 对于后台项目中的已知页面，用户无权限访问时会得到更合理的 `403` 提示，而不是误导性地显示 `404`。

## 22. 接入全局按钮权限组件

### 解决的问题

- 当前页面虽然已经补了测试按钮，但还没有真正使用 `profile.permissions` 控制显示。
- 如果每个页面都手写权限判断，后续维护会变得分散，模板层也不够统一。

### 实现方案

- 新增全局 `PermissionButton` 组件，在组件内部统一读取 `profile store` 中的权限码。
- `PermissionButton` 接收 `permissionCode`，无权限时直接不渲染，按钮其他属性继续透传给 `antd Button`。
- 在 `dashboard`、`content`、`system/user` 页面中统一改为使用 `PermissionButton`，减少页面侧重复判断逻辑。

### 当前收益

- 当前项目已经具备全局可复用的按钮权限能力。
- 不同账号登录后，页面内的操作按钮会根据 `permissions` 自动显示或隐藏，页面接入成本更低。

## 23. 接入布局面包屑

### 解决的问题

- 当前后台布局虽然已经有动态菜单和页面标题，但缺少后台项目常见的面包屑导航。
- 用户进入多级页面后，无法直观看到当前所在位置以及页面层级关系。

### 实现方案

- 在布局层基于当前 `menus` 和 `location.pathname` 递归查找当前页面对应的菜单链路。
- 使用 `Ant Design Breadcrumb` 渲染面包屑，先保留纯展示形态，避免在模板早期引入额外跳转交互。
- 保持实现集中在布局文件中，避免为了这一功能继续拆分更多文件。

### 当前收益

- 当前页面的层级关系已经能通过面包屑展示出来。
- 后台布局已经具备常见的路径层级提示，页面结构更清晰。

## 24. 接入全局主题切换

### 解决的问题

- 当前模板只有单一浅色视觉，缺少后台项目常见的 light / dark 主题切换能力。
- 如果主题状态只放在布局组件里，后续登录页、异常页和更多全局组件无法共享同一套主题模式。

### 实现方案

- 新增 `theme store`，使用 `Zustand persist` 持久化 `themeMode`，保证刷新页面后继续保留用户选择。
- 在 `App.tsx` 中统一接入 `Ant Design ConfigProvider`，根据 `themeMode` 切换 `defaultAlgorithm` 和 `darkAlgorithm`。
- 同时将主题模式同步到根节点 `data-theme`，让项目自己的布局背景、边框和文本颜色也能通过 CSS 变量统一响应。
- 在布局 Header 中使用 `Switch` 提供主题切换入口，交互保持简单直接。

### 关键代码片段

```tsx
<ConfigProvider
  theme={{
    algorithm: themeMode === 'dark'
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
  }}
>
  <RouterProvider router={router} />
</ConfigProvider>
```

### 当前收益

- 当前模板已经具备基础的浅色 / 深色主题切换能力。
- 主题状态是全局共享且可持久化的，后续继续覆盖登录页、异常页和更多页面时不需要推倒重来。

## 25. 挂载 Ant Design App 全局容器

### 解决的问题

- 当前项目虽然已经接入 `ConfigProvider` 和动态主题，但 `http` 层仍然在使用 `message.error` 静态方法，无法稳定消费主题上下文。
- 如果后续还要在组件外模块里统一调用 `message`、`modal`、`notification`，缺少一个可靠的全局实例承载点。

### 实现方案

- 在 `App.tsx` 中引入 `Ant Design App` 组件，放在 `ConfigProvider` 内层，作为全局反馈实例的统一容器。
- 当前先只在组件内消费 `App.useApp()`，例如布局里的退出确认弹窗直接使用 `modal` 实例。
- 组件外模块如 `http` 层，暂时仍保持静态 `message` 用法，避免在模板早期引入额外桥接复杂度。

### 当前收益

- 当前项目已经在根组件挂载了 `Ant Design App` 容器。
- 组件内需要使用 `modal / message / notification` 时，后续可以直接基于 `App.useApp()` 扩展，不需要再改应用入口结构。

## 26. 收敛全局页面加载态组件

### 解决的问题

- `App.tsx` 和路由守卫里都各自维护了一份“页面加载中...”占位，表现不统一，也不便于后续统一升级样式。
- 当前模板已经接入 `Ant Design`，继续用纯文本加载提示会显得过于简陋。

### 实现方案

- 新增通用 `AppLoading` 组件，统一使用 `Ant Design Spin` 渲染加载态。
- 组件支持 `fullscreen` 模式，用于应用初始化和路由守卫这类全屏等待场景。
- `App.tsx` 和 `router/guard.tsx` 全部改为复用同一个加载组件，避免继续重复定义。

### 当前收益

- 当前项目的应用初始化和路由守卫加载态已经统一。
- 后续如果要继续调整加载文案、动画或布局，只需要维护一个公共组件。

## 27. 接入框架层国际化基础能力

### 解决的问题

- 当前模板的登录页、布局、异常页和通用提示文案都写死为中文，缺少后台项目常见的多语言扩展能力。
- 如果后续再做国际化而没有统一入口，语言资源、组件文案和 Ant Design 自身语言环境会分散在多个地方，维护成本很高。

### 实现方案

- 新增 `src/i18n/index.ts`，统一初始化 `i18next` 与 `react-i18next`，并内置 `zh-CN / en-US` 两套语言资源。
- 在应用入口先加载 i18n，再在 `App.tsx` 中根据当前语言同步切换 `Ant Design ConfigProvider` 的 locale。
- 头部加入轻量语言切换入口，语言切换结果持久化到 `localStorage`。
- 先覆盖框架层文案，包括登录页、布局、403、404、全局加载态和通用 HTTP 提示。
- 菜单标题优先根据当前路由路径映射国际化 key，未命中时再回退到原始菜单标题，避免这一步牵连 mock 数据结构调整。

### 当前收益

- 当前模板已经具备可用的中英文切换能力。
- Ant Design 组件和框架层自定义文案已经能在同一套语言环境下保持一致。

## 28. 适配 GitHub Pages 静态部署

### 解决的问题

- GitHub Pages 只提供静态文件托管，当前项目直接部署会同时遇到三个问题：资源路径 `base` 不正确、`BrowserRouter` 刷新子路由会 404、生产环境没有本地 mock 服务导致登录链路失效。

### 实现方案

- 在 `vite.config.ts` 中根据 `VITE_DEPLOY_TARGET=github-pages` 自动切换 `base`，并优先读取 Actions 提供的 `GITHUB_REPOSITORY` 推导仓库名。
- 进一步收敛为环境变量驱动：开发环境和 GitHub Pages 分别通过不同 `.env` 文件声明 `VITE_PUBLIC_BASE`，让 `vite.config.ts` 直接读取，不再在配置文件里推导仓库名。
- 在路由层按部署目标切换为 `createHashRouter`，避免 GitHub Pages 对子路径刷新返回静态 404。
- 在 `main.tsx` 中仅对 GitHub Pages 生产构建启用 `vite-plugin-mock/client` 的浏览器端生产 mock，让演示站点继续可登录、可获取 profile。
- 新增 GitHub Actions 工作流，按 Vite 官方推荐方式构建并发布到 Pages。
- 将 `mock` 目录纳入 `tsconfig.app.json`，确保生产构建时可正确打包浏览器端 mock 所需模块。

### 当前收益

- 当前项目已经具备部署到 GitHub Pages 的基础条件。
- 本地开发仍然保持现有体验，只有 GitHub Pages 构建才会切到对应的 `base`、`HashRouter` 和生产 mock 模式。
