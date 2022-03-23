import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, userSelectors } from 'store/user'
import isPlainObject from 'lodash/isPlainObject'
import { LogoImage } from 'assets/images'
import styles from './index.module.scss'

export default function Home() {
  const dispatch = useDispatch()
  const { data, loading, success } = useSelector(userSelectors.listUser)
  const user = data?.data
  const fetchUser = useCallback(
    (_data) => {
      dispatch(userActions.list.start(_data))
    },
    [dispatch]
  )

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <div className={styles.container}>
      <LogoImage className={styles.logo} />
      <header className={styles.appHeader}>
        <div>
          <ul className={styles.list}>
            <li className={styles.description}>Open redux devtools</li>
            <li className={styles.description}>Press 'Fetch User'</li>
            <li className={styles.description}>See how redux structure is</li>
          </ul>
          <button onClick={fetchUser}>Fetch list users</button>
          <button onClick={() => fetchUser({ userId: 2 })}>Fetch user</button>

          <ul className={styles.list}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {success ? (
                  isPlainObject(user) ? (
                    <li>{user?.email}</li>
                  ) : (
                    user?.map((data, i) => <li key={i}>{data.email}</li>)
                  )
                ) : (
                  <li>Fetch Error</li>
                )}
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  )
}
