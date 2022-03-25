import { useSelector } from 'react-redux'
import { authSelectors } from 'store/auth'

export default function useUser() {
  const accessToken = useSelector(authSelectors.accessToken)

  return [
    {
      isAuthenticated: !!accessToken,
    },
  ]
}
