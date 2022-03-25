import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import pages from 'routes/pages'
import useUser from 'hooks/user'
import pageNamePathMap from './page-name-path-map'

export default function Router() {
  const [{ isAuthenticated }] = useUser()

  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ Component, path, name, redirect, authProtected }) => {
          if (authProtected && !isAuthenticated) {
            return (
              <Route
                element={<Navigate to={pageNamePathMap.login} />}
                path={path}
                key={name}
              />
            )
          }
          if (path === pageNamePathMap.login && isAuthenticated) {
            return (
              <Route
                element={<Navigate to={pageNamePathMap.default} />}
                path={path}
                key={name}
              />
            )
          }
          return (
            <Route
              element={redirect ? <Navigate to={redirect} /> : <Component />}
              path={path}
              key={name}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
