import { Button } from 'antd'
import type { ButtonProps } from 'antd'

import { useProfileStore } from '@/store'
import type { PermissionCode } from '@/types'

interface PermissionButtonProps extends ButtonProps {
  permissionCode: PermissionCode
}

/**
 * 全局权限按钮组件
 * 当前用户没有对应权限码时，按钮直接不渲染
 */
function PermissionButton({ permissionCode, children, ...buttonProps }: PermissionButtonProps) {
  const permissions = useProfileStore((state) => state.permissions)

  if (!permissions.includes(permissionCode)) {
    return null
  }

  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  )
}

export default PermissionButton
