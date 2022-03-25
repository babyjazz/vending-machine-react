import { bankNotesMapper } from 'constants/all'

export const getTotal = (bankNotes) => {
  let balance = 0
  const moneyKeys = Object.keys(bankNotesMapper)

  moneyKeys.forEach((moneyKey) => {
    balance += (bankNotesMapper?.[moneyKey] || 0) * (bankNotes?.[moneyKey] || 0)
  })

  return balance
}
