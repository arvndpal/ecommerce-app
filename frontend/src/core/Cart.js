import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { getCarts } from './cartHelper'
import Card from './Card';
import { Link } from 'react-router-dom'
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);


  useEffect(() => {

    setItems(getCarts)
  }, [run])

  const showItems = (items) => {
    return (
      <div>
        <h2 className="mb-3">Your cart has {`${items.length}`} items</h2>
        <div className="row">
          {
            items.map((product, i) => (
              <div
                key={i} className="col-12 mb-3">
                <Card
                  product={product}
                  showAddToCartButton={false}
                  cartUpdate={true}
                  showRemoveProductButton={true}
                  setRun={setRun}
                  run={run}
                />
              </div>
            ))
          }</div>
      </div>
    )
  }
  const noItemMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  )
  return (

    <Layout
      title={"Shopping Cart"}
      description={"Manage your cart items. Add, Remove, Checkout or continue shopping."}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length ? showItems(items) : noItemMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2><hr />
          <Checkout products={items}

            setRun={setRun}
            run={run}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Cart