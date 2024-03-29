import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Card from './Card'
import { read, listRelated } from './apiCore'
const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState(false)

  const loadSingleProduc = productId => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error)
          } else {
            setRelatedProducts(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduc(productId)
  }, [props])
  return (
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}>
      <div className="row">
        <div className="col-8">
          {product && product.description &&
            (<Card product={product} showViewProductButton={false} />)}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {
            relatedProducts.map((product, i) => {
              return <div className="mb-3"><Card product={product} /></div>
            })
          }
        </div>
      </div>
    </Layout>
  )
}
export default Product
