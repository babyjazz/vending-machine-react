import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth'
import { Form, Input, Button, Card, Alert } from 'antd'
import styles from './index.module.scss'

export default function Login() {
  const dispatch = useDispatch()
  const submitLogin = useCallback(
    (data) => {
      dispatch(authActions.login.start(data))
    },
    [dispatch],
  )

  const onFinish = (value) => {
    submitLogin(value)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign-in for receiving you balance</h2>
      <Card className={styles.card}>
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Alert message="" type="error" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
