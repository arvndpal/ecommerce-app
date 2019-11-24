import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {

  const [checked, setChecked] = useState([]);

  const handleToggle = c => () => {

    const currentCategoryId = c;
    const newCheckedCategoryId = [...checked]

    if (newCheckedCategoryId.indexOf(currentCategoryId) === -1) {
      newCheckedCategoryId.push(currentCategoryId)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }

    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }
  return categories.map((c, i) => {
    return (
      <li key={i} className="list-unstyle">
        <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id) === -1} type="checkbox" className="form-check-input" />
        <label className="form-check-label" >{c.name}</label>
      </li>
    )
  })

}

export default Checkbox