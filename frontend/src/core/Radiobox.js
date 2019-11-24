import React, { useState, useEffect, Fragment } from 'react'

const Radiobox = ({ prices, handleFilters }) => {

  const handleChange = (event) => {
    handleFilters(event.target.value)
  }
  return (
    <Fragment>
      {
        prices.map((price, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                onChange={handleChange}
                value={price._id}
                name={price}
                className="mr-2 mml-4" />
              <label className="for-check-label">{price.name}</label>
            </div>
          )
        })
      }
    </Fragment>
  )
}
export default Radiobox
