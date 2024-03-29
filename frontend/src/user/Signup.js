import React, { useState } from 'react'
import Layout from '../core/Layout';
import { signup } from '../auth';
import { Link } from 'react-router-dom'

const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const { name, email, password, success, error } = values;

  const handleChange = (name) => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, error: false })
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        }
        else {
          setValues({
            ...values,
            error: "",
            success: true,
            name: "",
            email: "",
            password: ''
          })
        }
      })
  }
  const signUpForm = () => (
    <div>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
      New account created successfully. Please <Link to="/signin">Signin.</Link>
    </div>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  )

  return (
    <Layout
      title={"Signup"}
      description={"Signup to Node React E-commerce App"}
      className="container col-md-8 col-offset-2"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>)
}

export default Signup;