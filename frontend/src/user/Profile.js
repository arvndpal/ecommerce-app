import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  })

  const { name, email, password, error, success } = values;
  const { token } = isAuthenticated();
  const init = (userId) => {
    // console.log("usrId", userId)
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId);
  }, [])
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }
  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true
            })
          })
        }
      })
  }
  const profileUpdate = (name, email, password) => {
    console.log("name, email, password ==>", name, email, password)
    return <form>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" onChange={handleChange("name")} value={name} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">email</label>
        <input type="text" onChange={handleChange("email")} value={email} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" onChange={handleChange("password")} value={password} className="form-control" />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Update</button>
    </form>
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  return (
    <Layout
      title="Profile "
      description={`Update your profile`}
      className="container-fluid"
    >
      <div>Profile Update</div>
      {redirectUser(success)}
      {profileUpdate(name, email, password)}
    </Layout>)
}

export default Profile