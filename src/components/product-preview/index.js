import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'
import { Divider, Image } from 'antd'
import { emptyImage } from 'assets/images'
import { initialBanNotePayment } from 'constants/all'
import { getTotal } from 'utils/get-balance'
import { FormattedMessage } from 'react-intl'
import styles from './index.module.scss'

export default function ProductPreview({ product, bankNotePayment }) {
  return (
    <div className={styles.container}>
      <div className={styles.item} key={product?.name}>
        <Image
          src={product?.img || emptyImage}
          fallback={emptyImage}
          className={styles.img}
          alt={`vending machine - ${product?.name}`}
        />
        <h1 className={styles.price}>฿{product?.price || '-'}</h1>
        <Divider />
        <FormattedMessage id="product_preview.insert_coin" />
        <p className={styles.fill_coin}>
          ฿{new BigNumber(getTotal(bankNotePayment)).toFormat()}
        </p>
      </div>
    </div>
  )
}

ProductPreview.defaultProps = {
  product: {},
  bankNotePayment: initialBanNotePayment,
}

ProductPreview.propTypes = {
  product: PropTypes.object,
  bankNotePayment: PropTypes.object,
}
