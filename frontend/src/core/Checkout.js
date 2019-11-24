import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { getBraintreeClientToken, processPayment, createOrder } from './apiCore'
import Card from './Card';
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth';
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from './cartHelper';


const Checkout = ({ products, setRun = f => f, run = undefined }) => {
  console.log("products", products)
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    loading: false
  })
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getToken = () => {
    getBraintreeClientToken(userId, token).then(data => {
      console.log("data token ", data)
      if (data.error) {
        setData({ ...data, error: data.error })
      } else {
        setData({ clientToken: data.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken()
  }, [])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div> {showDropIn()} </div>
    ) : (
        <Link to="/signin">
          <button className="btn btn-primary">
            Signin in to Checkout
        </button>
        </Link>
      )
  }

  const buy = () => {
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod
    setData({ ...data, loading: true })
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
      .then(response => {
        // console.log("nonce data", response);
        nonce = response.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        }

        processPayment(userId, token, paymentData)
          .then(response => {

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address
            }
            createOrder(userId, token, createOrderData)
              .then(response => {

                emptyCart(() => {
                  setRun(!run)
                  // console.log("payment successfull, cart enpty")

                  setData({ ...data, success: true, loading: false })
                })
              })
          })
          .catch(error => {
            setData({ loading: false })

            console.log(error)
          })
      })
      .catch(error => {
        console.log("dropin error", error)
        setData({ ...data, error: error.message })

      })
  }

  const showError = (error) => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  )

  const showSuccess = (success) => (
    <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
      Thanks!, Your payment is successful.
    </div>
  )

  const handleAddress = event => {
    setData({ ...data, address: event.target.value })
    console.log(data.address)
  }
  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {
          data.clientToken !== null && products.length > 0 ? (
            <div>
              <div className="gorm-group mb-3">
                <label className="text-muted"> Delivery Address:</label>
                <textarea
                  onChange={handleAddress}
                  className="form-control"
                  value={data.address}
                  placeholder="Type your delivery address..."
                />
              </div>
              <DropIn
                options={{
                  authorization: data.clientToken,
                  paypal: {
                    flow: 'vault'
                  }
                }}
                onInstance={instance => (data.instance = instance)}
              />
              <button onClick={buy} className="btn btn-success btn-block"> Checkout </button>
            </div>
          ) : null
        }
      </div>
    )
  }
  const showLoading = (loading) => {
    return (
      <h2 style={{ display: loading ? "" : "none" }}> loading...</h2>
    )
  }
  return <div>
    <h2>Total: ₹{getTotal()}</h2>
    {showLoading(data.loading)}
    {showSuccess(data.success)}
    {showError(data.error)}
    {showCheckout()}
  </div>
}

export default Checkout;