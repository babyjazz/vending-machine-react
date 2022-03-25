import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from 'store/user'
import { LogoImage } from 'assets/images'
import styles from './index.module.scss'

export default function Home() {
  const dispatch = useDispatch()
  const fetchUser = useCallback(
    (_data) => {
      dispatch(userActions.list.start(_data))
    },
    [dispatch],
  )

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <div className={styles.container}>
      <LogoImage className={styles.logo} />
      <header className={styles.appHeader} />
    </div>
  )
}
