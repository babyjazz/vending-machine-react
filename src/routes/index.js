import React from 'react'
import { BrowserRouter, Route, Navigate } from 'react-router-dom'
import pages from 'routes/pages'

export default function Routes() {
  return (
    <BrowserRouter>
      <Routes>
        {pages.map(({ Component, path, name, redirect }) => (
          <Route
            element={
              redirect ? <Navigate to={redirect} key={name} /> : <Component />
            }
            path={path}
            key={name}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
