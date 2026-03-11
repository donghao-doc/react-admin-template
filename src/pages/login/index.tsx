import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.scss'

interface LoginFormValues {
  username: string
  password: string
  remember: boolean
}

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
    label: '超级管理员',
    username: 'admin',
    password: '123456',
  },
  {
    key: 'editor',
    label: '内容运营',
    username: 'editor',
    password: '123456',
  },
  {
    key: 'visitor',
    label: '只读访客',
    username: 'visitor',
    password: '123456',
  },
]

function Login() {
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [activeAccountKey, setActiveAccountKey] = useState<string>(demoAccounts[0].key)

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
  async function handleSubmit() {
    setSubmitting(true)

    await new Promise((resolve) => {
      window.setTimeout(resolve, 600)
    })

    setSubmitting(false)
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <Card className="login-page__card">
        <Space className="login-page__content" orientation="vertical" size={24}>
          <Space orientation="vertical" size={8}>
            <Typography.Title className="login-page__title" level={3}>
              管理后台登录
            </Typography.Title>
            <Typography.Text type="secondary">
              当前阶段仅实现页面结构和交互，暂未接入真实接口。
            </Typography.Text>
          </Space>

          <Space wrap>
            {demoAccounts.map((account) => (
              <Button
                key={account.key}
                type={activeAccountKey === account.key ? 'primary' : 'default'}
                onClick={() => handleFillAccount(account)}
              >
                {account.label}
              </Button>
            ))}
          </Space>

          <Form<LoginFormValues>
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
              label="账号"
              name="username"
              rules={[{ required: true, message: '请输入登录账号' }]}
            >
              <Input
                allowClear
                prefix={<UserOutlined />}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入登录密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item className="login-page__submit">
              <Button
                block
                htmlType="submit"
                icon={<SafetyCertificateOutlined />}
                loading={submitting}
                type="primary"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  )
}

export default Login
