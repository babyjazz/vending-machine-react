import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import pages from 'routes/pages'
import useUser from 'hooks/user'
import pageNamePathMap from './page-name-path-map'

export default function Router() {
  const [{ isAuthenticated }] = useUser()

  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ Component, path, name, redirect, authProtected }) => (
          <Route
            element={
              authProtected && !isAuthenticated ? (
                <Navigate to={pageNamePathMap.login} />
              ) : (
                <>{redirect ? <Navigate to={redirect} /> : <Component />}</>
              )
            }
            path={path}
            key={name}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
