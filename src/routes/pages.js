import Home from 'pages/home'
import pageNamePathMap from 'routes/page-name-path-map'

const pages = [
  {
    name: 'default',
    path: pageNamePathMap.default,
    component: Home,
    exact: true,
    authProtected: false,
  },
]

export default pages
