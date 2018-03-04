import React from 'react'

const LoginForm = ({ onSubmit, valueName, valuePsw, onChange }) => {
  return (
    <div className='loginForm'>
      <h2>Sign in</h2>

      <form onSubmit={onSubmit}>
        <div>
          Username
          <input
            type="text"
            name="username"
            value={valueName}
            onChange={onChange}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            value={valuePsw}
            onChange={onChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}


export default LoginForm

