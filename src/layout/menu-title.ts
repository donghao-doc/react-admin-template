const menuTitleKeyMap: Record<string, string> = {
  '/dashboard': 'menu.dashboard',
  '/system': 'menu.system',
  '/system/user': 'menu.systemUser',
  '/content': 'menu.content',
}

/**
 * 根据菜单路径获取国际化标题，未命中时回退到原始标题
 */
export function getMenuTitle(
  path: string,
  fallbackTitle: string,
  t: (key: string) => string,
) {
  const titleKey = menuTitleKeyMap[path]

  return titleKey ? t(titleKey) : fallbackTitle
}
