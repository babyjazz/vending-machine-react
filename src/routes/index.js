import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import pages from 'routes/pages'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ Component, path, name, redirect }) => (
          <Route
            element={redirect ? <Navigate to={redirect} /> : <Component />}
            path={path}
            key={name}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
