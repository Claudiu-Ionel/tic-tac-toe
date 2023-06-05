import React, { useState } from 'react'
import './_authMenu.scss'
import Logo from '../Logo';
import {ReactComponent as EyeOpened} from '../../assets/Eye-opened.svg'
import {ReactComponent as EyeClosed} from '../../assets/Eye-closed.svg'
const Auth = () => {
  const  [authState, setAuthState] = useState<"Registration" | "Login">("Registration");
  const  [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  return (
    <div className='gameMenu-wrapper'>
      <Logo/>
        {
          authState === "Registration" && 
          <div className='auth-wrapper'>
          <h6 className='title'>Registration</h6>
          <form className='input-wrapper' action="">
            <label htmlFor="username">username</label>
            <input id='username' name='username' type="text" autoComplete='off' />
            <label htmlFor="password">password</label>
            <div>
            <input id="password" name='password' type={passwordVisible === false ? "password" : "text"} autoComplete='off' />
            {!passwordVisible && <EyeOpened className='eye-icon' onClick={() => setPasswordVisible(true)}></EyeOpened>}
            {passwordVisible && <EyeClosed className='eye-icon' onClick={() => setPasswordVisible(false)}></EyeClosed>}
            </div>
            
          </form>
          <button className='auth-button' type="submit">Register</button>
          </div>
        }
        {
          authState === "Login" && 
          <div className='auth-wrapper'>
          <h6 className='title'>Login</h6>
          <form className='input-wrapper' action="">
            <label htmlFor="username">username</label>
            <input id='usename' name='username' type="text" />
            <label htmlFor="password">password</label>
            <input id="password" name='password' type="password" />
          </form>
          <button className='auth-button' type="submit">Login</button>
          </div>
        }
    </div>
  )
}

export default Auth