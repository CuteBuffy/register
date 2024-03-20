import react, { useState } from 'react'

export default function Form() {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmed_password: "",
    choice_subject: ""
  })

  const [timeoutId, setTimeoutId] = useState()

  const [passError, setPassError] = useState(false)
  const [lengthError, setLengthError] = useState(false)
  const [incorrectEmail, setIncorrectEmail] = useState(false)
  const [emptyChoiceSubject, setEmptyChoiceSubject] = useState(false)

  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const handleChange = e => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if ((userData.password === userData.confirmed_password) && (userData.password.length >= 8) && (emailRegex.test(userData.email)) && (userData.choice_subject !== "") && (!errorMsg)) {
      setSuccessMsg("Successfully registered!")
      setTimeoutId(setTimeout(() => {
        setSuccessMsg("")
      }, 2000))
      setUserData(prevData => ({
        email: "",
        password: "",
        confirmed_password: "",
        last_subject: ""
      }))
      console.log(userData)
    } else if (userData.password !== userData.confirmed_password) {
      setPassError(true)
      setErrorMsg("Password Doesn't Match!")
      setTimeoutId(setTimeout(() => {
        setPassError(false)
        setErrorMsg("")
      }, 2000))
      clearTimeout(timeoutId)
    } else if ((userData.password === userData.confirmed_password) && (userData.password.length < 8)) {
      setLengthError(true)
      setErrorMsg("Password is too short!")
      setTimeoutId(setTimeout(() => {
        setLengthError(false)
        setErrorMsg("")
      }, 2000))
      clearTimeout(timeoutId)
    } else if (!emailRegex.test(userData.email)) {
      setIncorrectEmail(true)
      setErrorMsg("Incorrect Email!")
      setTimeoutId(setTimeout(() => {
        setErrorMsg("")
        setIncorrectEmail(false)
      }, 2000))
      clearTimeout(timeoutId)
    } else if (userData.choice_subject === "") {
      setEmptyChoiceSubject(true)
      setErrorMsg("Pick a Subject!")
      setTimeoutId(setTimeout(() => {
        setErrorMsg("")
        setEmptyChoiceSubject(false)
      }, 2000))
      clearTimeout(timeoutId)
    } else if (errorMsh) {
      
    }
  }

  const errorStyle = {
    right: errorMsg && "0"
  }

  const successStyle = {
    right: (successMsg) && "0"
  }

  return (
    <>
      <div className="container form__wrapper">
        <form className="form__container">
          <h3 className="form__title">Register</h3>
          <div className="inputs__container">
            <input
              type="email"
              placeholder="Email"
              name='email'
              value={userData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={userData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name='confirmed_password'
              value={userData.confirmed_password}
              onChange={handleChange}
            />
          </div>
          <select name='choice_subject' value={userData.choice_subject}
            onChange={handleChange} className='select__container'>
            <option value="">-Виберіть 4-й предмет-</option>
            <option value="Англійська Мова">Англійська Мова</option>
            <option value="Іспанська Мова">Іспанська Мова</option>
            <option value="Біологія">Біологія</option>
            <option value="Фізика">Фізика</option>
            <option value="Хімія">Хімія</option>
          </select>
          <button onClick={handleSubmit} className='register__btn'>Register</button>
          {errorMsg && <h2 style={errorStyle} className='error_msg'>{errorMsg}</h2>}
          {successMsg && <h2 style={successStyle} className='successfully_registered'>{successMsg}</h2>}
        </form>
      </div>
    </>
  )
}