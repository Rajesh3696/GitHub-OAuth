import React from 'react'
import GitHubLogin from 'react-github-login'
import { useNavigate } from 'react-router-dom'
const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const onSuccessGithub = (response) => {
    sessionStorage.setItem('token', response.code)
    setIsAuthenticated(true)
    navigate('/repo-list')
  }
  return (
    <section className="bg-indigo-950 min-h-screen pt-20">
      <div className="container flex justify-center items-center ">
        <GitHubLogin
          clientId="4765bde55d96b7a9a337"
          onSuccess={onSuccessGithub}
          buttonText="LOGIN WITH GITHUB"
          className="bg-neutral-300 md:w-4/12 h-8"
          valid={true}
          redirectUri="http://localhost:3000"
        />
      </div>
    </section>
  )
}
export default LoginPage
