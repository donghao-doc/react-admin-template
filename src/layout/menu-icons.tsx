import {
  DashboardOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'

/**
 * 菜单图标映射
 */
export const menuIconMap: Record<string, ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  SettingOutlined: <SettingOutlined />,
  TeamOutlined: <TeamOutlined />,
  ReadOutlined: <ReadOutlined />,
}
