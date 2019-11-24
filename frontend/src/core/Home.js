import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { getProducts } from './apiCore'
import Card from './Card';
import Search from './Search';
const Home = () => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])
  const [error, setError] = useState(false)
  const loadProductBySell = () => {
    getProducts("sold")
      .then(data => {
        if (data.error) {
          setError({ error: data.error })
        } else {

          console.log("loadProductBySell ==>", data)
          setProductBySell(data)
        }
      })
  }
  const loadProductByArrival = () => {
    getProducts('createdAt')
      .then(data => {
        if (data.error) {
          setError({ error: data.error })
        } else {
          console.log("loadProductByArrival ==>", data)
          setProductByArrival(data)
        }
      })
  }

  useEffect(() => {
    loadProductByArrival();
    loadProductBySell()
  }, [])
  return (
    <Layout
      title={"Home"}
      description={"Node React E-commerce App"}
      className="container-fluid"
    >
      <Search />
      <h2>New Arrivals</h2><hr />
      <div className="row">
        {
          productByArrival.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))
        }
      </div>
      <h2>Best Sellers</h2><hr />
      <div className="row">
        {
          productBySell.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))
        }
      </div>
    </Layout>
  )
}


export default Home;