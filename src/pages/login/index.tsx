import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { App as AntdApp, Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { loginApi } from '@/api'
import { useAuthStore, useProfileStore } from '@/store'
import type { LoginPayload } from '@/types'

import './index.scss'

interface DemoAccount {
  key: string
  label: string
  username: string
  password: string
}

/**
 * 演示账号用于快速填充表单，便于后续联调和测试
 */
const demoAccounts: DemoAccount[] = [
  {
    key: 'admin',
    label: 'accountAdmin',
    username: 'admin',
    password: '123456',
  },
  {
    key: 'editor',
    label: 'accountEditor',
    username: 'editor',
    password: '123456',
  },
  {
    key: 'visitor',
    label: 'accountVisitor',
    username: 'visitor',
    password: '123456',
  },
]

function Login() {
  const { message } = AntdApp.useApp()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginPayload>()
  const [submitting, setSubmitting] = useState(false)
  const [activeAccountKey, setActiveAccountKey] = useState<string>(demoAccounts[0].key)
  const setToken = useAuthStore((state) => state.setToken)
  const clearProfile = useProfileStore((state) => state.clearProfile)

  /**
   * 点击演示账号后直接回填表单，方便测试
   */
  function handleFillAccount(account: DemoAccount) {
    form.setFieldsValue({
      username: account.username,
      password: account.password,
      remember: false,
    })
    setActiveAccountKey(account.key)
  }

  /**
   * 登录提交
   */
  async function handleSubmit(values: LoginPayload) {
    setSubmitting(true)

    try {
      const res = await loginApi(values)

      // 登录前先清空旧的 profile，后续重新初始化
      clearProfile()
      setToken(res.data.token)
      message.success(t('auth.loginSuccess'))
      navigate('/dashboard')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <Card className="login-page__card">
        <Space className="login-page__content" orientation="vertical" size={24}>
          <Space orientation="vertical" size={8}>
            <Typography.Title className="login-page__title" level={3}>
              {t('auth.pageTitle')}
            </Typography.Title>
            <Typography.Text type="secondary">
              {t('auth.pageSubtitle')}
            </Typography.Text>
          </Space>

          <Space wrap>
            {demoAccounts.map((account) => (
              <Button
                key={account.key}
                type={activeAccountKey === account.key ? 'primary' : 'default'}
                onClick={() => handleFillAccount(account)}
              >
                {t(`auth.${account.label}`)}
              </Button>
            ))}
          </Space>

          <Form<LoginPayload>
            form={form}
            layout="vertical"
            initialValues={{
              username: demoAccounts[0].username,
              password: demoAccounts[0].password,
              remember: false,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label={t('auth.username')}
              name="username"
              rules={[{ required: true, message: t('auth.usernameRequired') }]}
            >
              <Input
                allowClear
                prefix={<UserOutlined />}
                placeholder={t('auth.usernamePlaceholder')}
              />
            </Form.Item>

            <Form.Item
              label={t('auth.password')}
              name="password"
              rules={[{ required: true, message: t('auth.passwordRequired') }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('auth.passwordPlaceholder')}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>{t('auth.rememberMe')}</Checkbox>
            </Form.Item>

            <Form.Item className="login-page__submit">
              <Button
                block
                htmlType="submit"
                icon={<SafetyCertificateOutlined />}
                loading={submitting}
                type="primary"
              >
                {t('auth.submit')}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  )
}

export default Login
