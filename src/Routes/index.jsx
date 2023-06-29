import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from '../Pages/Login'
import TrendingRepoList from '../Pages/Repolist'
import RepositoryDetails from '../Pages/RepoDetails'
import NotFound from './NotFound'
import React, { useState } from 'react'
function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()
  if (location.pathname == '/' || location.pathname == '') {
    return <Navigate to="/login" replace />
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/repo-list">
        {isAuthenticated && <Route index element={<TrendingRepoList />} />}
      </Route>
      <Route path="/repo-details">
        {isAuthenticated && <Route index element={<RepositoryDetails />} />}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default Index
