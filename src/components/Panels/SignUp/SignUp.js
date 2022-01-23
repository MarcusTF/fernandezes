import { useContext } from "react"
import { Field, Form } from "react-final-form"
import Lottie from "react-lottie-player"
import { Link } from "react-router-dom"
import { loadingLottieData } from "../../../assets/lottie"
import { AuthContext } from "../../../context"
import "./SignUp.scss"

const SignUp = () => {
  const {
    signUp,
    registration: { data, loading },
  } = useContext(AuthContext)

  const validateEmail = mail => (!/.+@.+\..+/.test(mail) ? "Invalid Email." : undefined)

  return (
    <Form onSubmit={values => signUp(values)}>
      {({ handleSubmit, form: { getFieldState, getState } }) => {
        const email = getFieldState?.("email"),
          username = getFieldState?.("username"),
          password = getFieldState?.("password"),
          confirmPassword = getFieldState?.("confirmPassword")

        return (
          <form className='signup-form' onSubmit={handleSubmit}>
            {data ? (
              <p>Thanks! An email confirmation has been sent to {data}</p>
            ) : loading ? (
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
                  {email?.value && <label htmlFor='email'>Email</label>}
                  <Field
                    validate={v => (!v ? "Required." : null)}
                    autoComplete='email'
                    placeholder='Email'
                    id='email'
                    component='input'
                    name='email'
                    type='email'
                  />
                  {email?.error && email?.touched && (
                    <span role='note' className='error'>
                      {email?.error}
                    </span>
                  )}
                </div>
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
                <div className='field-wrapper'>
                  {confirmPassword?.value ? <label htmlFor='confirmPassword'>Confirm Pass</label> : null}
                  <Field
                    validate={(value, allValues) =>
                      value === allValues.password ? (!value ? "Required." : null) : "Passwords don't match"
                    }
                    autoComplete='off'
                    placeholder='Confirm Pass'
                    id='confirmPassword'
                    component='input'
                    type='password'
                    name='confirmPassword'
                  />
                  {confirmPassword?.error && confirmPassword?.touched && (
                    <span role='note' className='error'>
                      {confirmPassword?.error}
                    </span>
                  )}
                </div>

                <button>Submit</button>
                <p>
                  Already have an account? <Link to='/login'>Log In</Link>
                </p>
              </>
            )}
          </form>
        )
      }}
    </Form>
  )
}

export default SignUp
