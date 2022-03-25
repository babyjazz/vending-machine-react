import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Button, Divider, Layout, Menu, Modal } from 'antd'
import BigNumber from 'bignumber.js'
import { laysImage } from 'assets/images'
import { productActions, productSelectors } from 'store/product'
import ProductPreview from 'components/product-preview'
import {
  bankNotesMapper,
  bankNotesArray,
  initialBanNotePayment,
} from 'constants/all'
import { getTotal } from 'utils/get-balance'
import { orderActions, orderSelectors } from 'store/order'
import pickBy from 'lodash/pickBy'
import { isEmpty, upperFirst } from 'lodash'
import styles from './index.module.scss'

const { Sider, Header, Content } = Layout

export default function Home() {
  const dispatch = useDispatch()
  const { data: products = [] } = useSelector(productSelectors.products)
  const order = useSelector(orderSelectors.order)
  const [selectedProduct, setSelectProduct] = useState()
  const [bankNotePayment, setBankNotePayment] = useState(initialBanNotePayment)

  const fetchProducts = useCallback(() => {
    dispatch(productActions.list.start())
  }, [dispatch])

  const submitPurchaseOrder = useCallback(
    (data) => {
      dispatch(orderActions.submit.start(data))
    },
    [dispatch],
  )

  const handleResetsPayBankNote = () => {
    setBankNotePayment(initialBanNotePayment)
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (order?.success) {
      const changes = order?.data?.changes
      const changesObj = Object.keys(order?.data?.changes).map((key) => ({
        coin: key,
        amount: changes[key],
      }))
      Modal.success({
        key: 'not',
        title: 'Order successful',
        duration: 1000,
        afterClose: () => {
          handleResetsPayBankNote()
          setSelectProduct()
        },
        content: (
          <div>
            <Divider />
            {!isEmpty(changesObj) && (
              <>
                <span>You get change for</span>
                {changesObj.map((obj) => (
                  <li>
                    {upperFirst(obj?.coin)} - {obj?.amount} Coins
                  </li>
                ))}
              </>
            )}
            <Divider />
            <span>Thank you, Please come back to visit us again</span>
          </div>
        ),
      })
    }
  }, [order])

  const handleSelectProduct = (product) => {
    setSelectProduct(product)
  }

  useEffect(() => {
    handleResetsPayBankNote()
  }, [selectedProduct])

  const handlePayBankNote = (bankNote) => {
    setBankNotePayment({
      ...bankNotePayment,
      [bankNote]: bankNotePayment[bankNote] + 1,
    })
  }

  const isSufficientToBuy = () => {
    return (
      selectedProduct &&
      getTotal(bankNotePayment) >= (selectedProduct?.price || 0)
    )
  }

  const handlePurchaseOrder = () => {
    const bankNotePaymentWithoutZero = pickBy(bankNotePayment, (v) => v > 0)
    submitPurchaseOrder({
      productId: selectedProduct?.id,
      ...bankNotePaymentWithoutZero,
    })
  }

  return (
    <Layout className={styles.container}>
      <Header className={styles.header}>
        <h1 className={styles.title}>
          <FormattedMessage id="vending.title" />
        </h1>
        <p className={styles.desc}>
          <FormattedMessage id="vending.sub_title" />
        </p>
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
                <p>
                  <FormattedMessage id="amount" />: {product?.amount}
                </p>
                <Button
                  type="primary"
                  onClick={() => handleSelectProduct(product)}
                >
                  <FormattedMessage id="purchase" />
                </Button>
              </div>
            ))}
          </div>
        </Content>

        <Sider width={400}>
          <ProductPreview
            product={selectedProduct}
            bankNotePayment={bankNotePayment}
          />

          <Menu mode="inline" defaultSelectedKeys={['1']}>
            {bankNotesArray
              .sort((a, b) => b?.createdAt - a?.createdAt)
              .map((bankNote) => (
                <Menu.Item key={bankNote}>
                  <Button
                    block
                    onClick={() => handlePayBankNote(bankNote)}
                    disabled={!selectedProduct}
                  >
                    {new BigNumber(bankNotesMapper[bankNote]).toFormat()}
                  </Button>
                </Menu.Item>
              ))}
            <Menu.Item key="reset">
              <Button
                block
                onClick={handleResetsPayBankNote}
                disabled={!selectedProduct}
              >
                <FormattedMessage id="reset" />
              </Button>
            </Menu.Item>

            <div style={{ padding: 20 }}>
              <Button
                size="large"
                block
                disabled={!isSufficientToBuy()}
                onClick={handlePurchaseOrder}
                loading={order?.loading}
              >
                <FormattedMessage id="purchase" />
              </Button>
            </div>
          </Menu>
        </Sider>
      </Layout>
    </Layout>
  )
}
