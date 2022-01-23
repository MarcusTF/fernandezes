import { useContext, useState } from "react"
import { Field, Form } from "react-final-form"
import Lottie from "react-lottie-player"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"
import { loadingLottieData } from "../../../assets/lottie"
import { AuthContext } from "../../../context"
import "./Login.scss"

const Login = () => {
  const [remember, setRemember] = useState(false)
  const {
    logIn,
    user,
    authentication: { loading, error },
  } = useContext(AuthContext)

  const nav = useNavigate()

  useEffect(() => {
    if (user) {
      if (remember) localStorage.setItem("_the_fernandezes_remember_me", JSON.stringify(user))
      sessionStorage.setItem("_the_fernandezes_session", JSON.stringify(user))
      nav("/")
    }
  }, [nav, remember, user])

  return (
    <Form onSubmit={values => logIn(values)}>
      {({ handleSubmit, form: { getFieldState } }) => {
        const username = getFieldState?.("username"),
          password = getFieldState?.("password")
        return (
          <form className='login-form' onSubmit={handleSubmit}>
            {loading ? (
              <Lottie
                role='img'
                aria-label='loading animation'
                animationData={loadingLottieData}
                play
                className='loading-lottie'
              />
            ) : (
              <>
                <div className='field-wrapper'>
                  {username?.value ? <label htmlFor='username'>Username</label> : null}
                  <Field
                    validate={v => (!v ? "Required." : null)}
                    autoComplete='username'
                    placeholder='Username'
                    id='username'
                    component='input'
                    name='username'
                  />
                  {username?.error && username?.touched && (
                    <span role='note' className='error'>
                      {username?.error}
                    </span>
                  )}
                </div>
                <div className='field-wrapper'>
                  {password?.value ? <label htmlFor='password'>Password</label> : null}
                  <Field
                    validate={v => (!v ? "Required." : null)}
                    autoComplete='current-password'
                    placeholder='Password'
                    id='password'
                    component='input'
                    type='password'
                    name='password'
                  />
                  {password?.error && password?.touched && (
                    <span role='note' className='error'>
                      {password?.error}
                    </span>
                  )}
                </div>
                <div className='options'>
                  <p>
                    <Link to='/oops'>Forgot Password?</Link>
                  </p>
                  <div className='check-wrapper'>
                    <input
                      onChange={() => setRemember(r => !r)}
                      checked={remember}
                      type='checkbox'
                      name='remember'
                      id='remember'
                    />
                    <label htmlFor='remember'>Stay Logged In</label>
                  </div>
                </div>
                <button>Log In</button>

                <p>
                  Don't have an account? <Link to='/signup'>Sign Up</Link>
                </p>
              </>
            )}
          </form>
        )
      }}
    </Form>
  )
}

export default Login
