import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { getProduct, getCategories, updateProduct } from './apiAdmin'

const UpdateProduct = ({ match }) => {
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

  const init = productId => {
    getProduct(productId)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            shipping: data.shipping,
            quantity: data.quantity,
            formData: new FormData()
          })
          initCategories()
        }
      })
  }
  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          categories: data,
          formData: new FormData()
        })
      }
    })
  }
  useEffect(() => {
    init(match.params.productId)
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

    updateProduct(match.params.productId, user._id, token, formData)
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
            error: false,
            loading: false,
            createdProduct: data.name,
            redirectToProfile: true,
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
      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  )

  const showSuccess = () => (

    <div className="alert alert-success" style={{ display: createdProduct ? "" : "none" }}>
      <h2>{`${createdProduct} is Updated!`}</h2>
    </div>
  )

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />
      }
    }
  }
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
    <Layout title="Update product"
      description={`G'day ${user.name}, ready to create  new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>


    </Layout>
  )
}

export default UpdateProduct;  