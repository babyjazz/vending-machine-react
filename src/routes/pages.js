import Home from 'pages/home'
import Login from 'pages/login'
import pageNamePathMap from 'routes/page-name-path-map'

const pages = [
  {
    name: 'default',
    path: pageNamePathMap.default,
    Component: Home,
    exact: true,
    authProtected: true,
  },
  {
    name: 'vending',
    path: pageNamePathMap.vending,
    Component: Home,
    authProtected: true,
  },
  {
    name: 'login',
    path: pageNamePathMap.login,
    Component: Login,
    authProtected: false,
  },
]

export default pages
