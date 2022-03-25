import { Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'

const { Sider, Header, Content } = Layout

export default function Home() {
  return (
    <Layout>
      <Layout className="site-layout">
        <Header>
          <h1>skdjf</h1>
        </Header>
      </Layout>
      <Layout className="site-layout">
        <Content>Content</Content>
        <Sider>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  )
}
