const zhCNMessages = {
  common: {
    loading: '页面加载中...',
    confirm: '确认',
    cancel: '取消',
    backHome: '返回首页',
    backPrevious: '返回上一页',
    goLogin: '去登录页',
  },
  app: {
    title: '管理后台模板',
    subtitle: 'React 管理后台模板',
  },
  auth: {
    loginSuccess: '登录成功',
    username: '账号',
    password: '密码',
    rememberMe: '记住我',
    submit: '登录',
    usernamePlaceholder: '请输入账号',
    passwordPlaceholder: '请输入密码',
    usernameRequired: '请输入登录账号',
    passwordRequired: '请输入登录密码',
    pageTitle: '管理后台登录',
    pageSubtitle: '使用演示账号登录后，将自动初始化当前用户的登录上下文数据。',
    accountAdmin: '超级管理员',
    accountEditor: '内容运营',
    accountVisitor: '只读访客',
    logout: '退出登录',
    logoutConfirmTitle: '确认退出登录？',
    logoutConfirmContent: '退出后将返回登录页，需要重新登录才能继续访问后台。',
    loggedOut: '未登录',
  },
  exception: {
    forbidden: '抱歉，你当前没有权限访问这个页面。',
    notFound: '抱歉，你访问的页面不存在或已被移除。',
  },
  http: {
    networkError: '网络异常，请稍后重试',
    unknownError: '未知错误',
    requestFailed: '请求失败',
  },
  menu: {
    dashboard: '工作台',
    system: '系统管理',
    systemUser: '用户管理',
    content: '内容管理',
  },
} as const

export default zhCNMessages
