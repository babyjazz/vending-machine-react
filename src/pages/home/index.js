import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Divider, Layout, Menu, Modal, Image } from 'antd'
import BigNumber from 'bignumber.js'
import { emptyImage } from 'assets/images'
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
import isEmpty from 'lodash/isEmpty'
import upperFirst from 'lodash/upperFirst'
import { LogoutOutlined } from '@ant-design/icons'
import { authActions } from 'store/auth'
import styles from './index.module.scss'

const { Sider, Header, Content } = Layout

export default function Home() {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { data: products = [] } = useSelector(productSelectors.products)
  const order = useSelector(orderSelectors.order)
  const [selectedProduct, setSelectProduct] = useState()
  const [bankNotePayment, setBankNotePayment] = useState(initialBanNotePayment)

  const logout = useCallback(() => {
    dispatch(authActions.logout())
  }, [dispatch])

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
    // Show modal success/failure when order finish

    if (order?.success) {
      const changes = order?.data?.changes
      const changesObj = Object.keys(order?.data?.changes).map((key) => ({
        coin: key,
        amount: changes[key],
      }))
      Modal.success({
        title: intl.formatMessage({ id: 'order.successful' }),
        afterClose: () => {
          handleResetsPayBankNote()
          setSelectProduct()
        },
        content: (
          <div>
            <Divider />
            {!isEmpty(changesObj) && (
              <>
                <span>
                  {intl.formatMessage({
                    id: 'order.successful.content.you_get_change',
                  })}
                </span>
                {changesObj.map((obj) => (
                  <li key={obj.coin}>
                    {upperFirst(obj?.coin)} - {obj?.amount} Coins
                  </li>
                ))}
                <Divider />
              </>
            )}
            <span>
              {intl.formatMessage({ id: 'order.successful.content.thankyou' })}
            </span>
          </div>
        ),
      })
    }
    if (order?.failure) {
      Modal.error({
        title: intl.formatMessage({ id: 'order.failure' }),
        afterClose: () => {
          handleResetsPayBankNote()
          setSelectProduct()
        },
        content: intl.formatMessage({
          id: order?.error?.response?.data?.message,
          defaultMessage: 'Please try again',
        }),
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
        <div className={styles.title_group}>
          <h1 className={styles.title}>
            <FormattedMessage id="vending.title" />
          </h1>
          <p className={styles.desc}>
            <FormattedMessage id="vending.sub_title" />
          </p>
        </div>
        <span
          className={styles.logout}
          role="button"
          tabIndex={0}
          onClick={logout}
        >
          <LogoutOutlined /> Logout
        </span>
      </Header>

      <Layout>
        <Content className={styles.content_container}>
          <div className={styles.content}>
            {products.map((product) => (
              <div className={styles.item} key={product?.name}>
                <Image
                  preview={false}
                  src={product?.image || ''}
                  fallback={emptyImage}
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
                  disabled={product?.amount <= 0}
                >
                  {product?.amount <= 0 ? (
                    <FormattedMessage id="purchase_btn.out_of_stock" />
                  ) : (
                    <FormattedMessage id="purchase" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Content>

        <Sider className={styles.sider_container} width={400}>
          <ProductPreview
            product={selectedProduct}
            bankNotePayment={bankNotePayment}
          />

          <Menu mode="inline" defaultSelectedKeys={['1']}>
            {bankNotesArray.map((bankNote) => (
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
                type="primary"
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
