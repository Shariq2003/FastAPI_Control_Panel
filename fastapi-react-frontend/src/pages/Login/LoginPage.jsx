import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = ({loginHandler}) => {
  return (
    <>
    <div className='container'>
        <LoginForm loginHandler={loginHandler}/>
    </div>
    </>
  )
}

export default LoginPage
