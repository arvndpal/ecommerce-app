import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token)
      .then(data => {
        if (data.error) {
          console.log("error", data.error)
        } else {
          setOrders(data)
        }
      })
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token)
      .then(data => {
        if (data.error) {
          console.log("error", data.error)
        } else {
          setStatusValues(data)
        }
      })
  }

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, [])

  const showOrdersLength = () => {
    if (orders.length > 1) {
      return <div className="text-danger display-2">Total orders: {orders.length}</div>
    } else {
      return <h4 className="text-danger">No Orders</h4>
    }
  }

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} readOnly className="form-control" />
    </div>
  )

  const handleStatusChange = (event, orderId) => {
    console.log(orderId)
    updateOrderStatus(user._id, token, orderId, event.target.value)
      .then(data => {
        if (data.err) {
          console.log("Status update failed.")
        } else {
          loadOrders();
        }
      })
  }
  const showStatus = o => {
    return <div className="form-group">
      <h3 className="mark mb-form">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update status</option>
        {
          statusValues.map((status, i) => {
            return <option key={i} value={status}>{status}</option>
          })
        }
      </select>
    </div>
  }
  return (
    <Layout title="Orders"
      description={`G'day ${user.name}!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {
            orders.map((o, oIndex) => {
              return (
                <div className="mt-5" key={oIndex} style={{ borderBottom: "5px solid indigo" }}>
                  <h2 className="mb-5">
                    <span className="bg-primary">Order ID: {o._id}</span>
                  </h2>
                  <ul className="list-group mb-2">
                    <li className="list-group-item">
                      {showStatus(o)}
                    </li>
                    <li className="list-group-item">
                      Transaction ID: {o.transaction_id}
                    </li>
                    <li className="list-group-item">
                      Amount: {o.amount}
                    </li>
                    <li className="list-group-item">
                      Order By: {o.user.name}
                    </li>
                    <li className="list-group-item">
                      Order On: <span title={o.createdAt}>{moment(o.createdAt).fromNow()}</span>
                    </li>

                    <li className="list-group-item">
                      Delivery Address: {o.address}
                    </li>
                  </ul>
                  <h3 className="mb-4 mt-4 font-italic">
                    Total products in the order: {o.products.length}
                  </h3>

                  {
                    o.products.map((p, pIndex) => {
                      return (
                        <div className="mb-4"
                          key={pIndex}
                          style={{
                            padding: "20px",
                            border: "1px solid indigo"
                          }}>
                          {showInput("Product name: ", p.name)}
                          {showInput("Product price: ", p.price)}
                          {showInput("Product total: ", p.count)}
                          {showInput("Product Id: ", p._id)}
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default Orders