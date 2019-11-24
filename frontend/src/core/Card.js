import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelper'
import moment from 'moment'


const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const shoulRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }
  const addtoCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }
  const showAddToCart = (showAddToCartButton) => (
    showAddToCartButton &&
    <button onClick={addtoCart} className="btn btn-sm btn-outline-warning my-2">Add to cart</button>


  )
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
        <span className="badge badge-primary badge-pill">Out of Stock</span>
      )
  }

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value > 1) {
      updateItem(productId, event.target.value)
      setRun(!run)
    }
  }
  const showCartUpdateOptions = (cartUpdate) => {
    return cartUpdate && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      </div>
    )
  }

  const showRemoveButton = (showRemoveProductButton) => {
    return showRemoveProductButton &&
      <button
        onClick={() => {
          removeItem(product._id)
          setRun(!run)
        }
        }
        className="btn btn-sm btn-outline-danger my-2"
      >Remove product
    </button>

  }
  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shoulRedirect()}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">Rs. {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>

        {showStock(product.quantity)}
        <br />
        <Link to={`/product/${product._id}`}>
          {
            showViewProductButton &&
            <button className="btn btn-sm btn-outline-primary my-2 mr-2">View product</button>
          }
        </Link>
        {showAddToCart(showAddToCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  )
}

export default Card