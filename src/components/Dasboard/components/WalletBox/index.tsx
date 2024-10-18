import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'

const WalletBox = ({
  API_WALLET,
  lang,
}: {
  API_WALLET: string
  lang: Lang
}) => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const loginData = localStorage.getItem('loginData')

    if (loginData) {
      const { token } = JSON.parse(loginData)

      // Make a fetch request to the API_WALLET with the token
      fetch(API_WALLET, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`, // Send token in Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Check if the response contains a balance and update the state

          if (data && data.balance !== undefined) {
            setBalance(data.balance)
          }
        })
        .catch((error) => {
          console.error('Error fetching wallet balance:', error)
        })
    }
  }, [])

  return (
    <div className={classes.walletBox}>
      <h2>
        {dynamicTranslate(lang, 'Saldo de su billetera', 'Your Wallet Balance')}
      </h2>
      <p>${balance}</p>
    </div>
  )
}
export default WalletBox
