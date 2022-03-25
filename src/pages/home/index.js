import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Layout, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { laysImage } from 'assets/images'
import { productActions, productSelectors } from 'store/product'
import styles from './index.module.scss'

const { Sider, Header, Content } = Layout

export default function Home() {
  const dispatch = useDispatch()
  const { data: products = [] } = useSelector(productSelectors.products)

  const fetchProducts = useCallback(() => {
    dispatch(productActions.list.start())
  }, [dispatch])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <h1 className={styles.title}>Vending Machine</h1>
        <p className={styles.desc}>Best food and drink deliver to your hand</p>
      </Header>

      <Layout className="site-layout">
        <Content>
          <div className={styles.content_container}>
            {products.map((product) => (
              <div className={styles.item} key={product?.name}>
                <img
                  src={laysImage}
                  className={styles.img}
                  alt={`vending machine - ${product?.name}`}
                />
                <h2>฿{product?.price}</h2>
                <p>Amount: {product?.amount}</p>
                <Button type="primary" onClick={() => {}}>
                  Purchase
                </Button>
              </div>
            ))}
          </div>
        </Content>

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
