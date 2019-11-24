import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'

const AddProduct = () => {
  const { user, token } = isAuthenticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: '',
    photo: '',
    error: "",
    loading: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  })
  const { name, description, price, categories, category, createdProduct, shipping, quantity, error, loading, redirectToProfile, formData } = values

  //load categories and set formdata

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        })
      }
    })
  }
  useEffect(() => {
    init()
  }, [])

  const handleChange = (name) => (event) => {
    console.log("handleChange")
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    console.log("name, value", name, value)
    setValues({ ...values, [name]: value })
  }
  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: "", loading: true })

    createProduct(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {

          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            categories: [],
            category: "",
            shipping: "",
            quantity: '',
            photo: '',
            error: "",
            loading: false,
            createdProduct: data.name,
            redirectToProfile: false,
            formData: ""
          })
        }
      })
  }
  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          <input type="file" accept="image/*"
            onChange={handleChange("photo")} />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Description
        </label>
        <textarea
          className="form-control"
          onChange={handleChange("description")}
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Price
        </label>
        <input
          className="form-control"
          type="number"
          onChange={handleChange("price")}
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Category
        </label>
        <select
          className="form-control"
          onChange={handleChange("category")}
        >
          <option>Please select</option>
          {
            categories &&
            categories.map((c, i) => {

              return <option key={i} value={c._id}>{c.name}</option>
            })
          }
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange("quantity")}
          value={quantity}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">
          Shipping
        </label>
        <select
          className="form-control"
          onChange={handleChange("shipping")}
        >  <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )

  const showSuccess = () => (

    <div className="alert alert-success" style={{ display: createdProduct ? "" : "none" }}>
      <h2>{`${createdProduct} is created!`}</h2>
    </div>
  )

  const showLoading = () =>
    loading && (

      <div className="alert alert-success" style={{ display: createdProduct ? "" : "none" }}>
        <h2>Loading...</h2>
      </div>
    )


  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  )

  return (
    <Layout title="Add a new product"
      description={`G'day ${user.name}, ready to create  new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
        </div>
      </div>


    </Layout>
  )
}

export default AddProduct;  