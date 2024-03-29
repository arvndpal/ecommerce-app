import React, { useEffect, useState } from 'react'
import { getCategories, list } from './apiCore'
import Card from './Card';
import { read } from 'fs';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    result: [],
    searched: false
  })
  const { categories, category, searched, search, result } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  useEffect(() => {
    loadCategories();
  }, [])

  const searchData = () => {
    // console.log(search, category)
    if (search) {
      list({ search: search || undefined, category }).then(response => {
        if (response.error) {
          console.log(response.error)
        } else {
          setData({ ...data, result: response, searched: true })
        }
      })
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  }

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} Product${results.length === 1 ? "" : "s"}`
    }
    if (searched && results.length < 1) {
      return `No product found.`
    }
  }
  const searchedProducts = (results = []) => {
    console.log(searched, "results", results)
    return (
      <div >
        <h2 className="mt-4 mb-4">
          {
            searchMessage(searched, results)
          }
        </h2>
        <div className="row">
          {
            results.map((product, i) => {

              return <div key={i} className="col-3 mb-3">
                <Card key={i} product={product} />
              </div>
            })
          }
        </div>
      </div>
    )
  }
  const searchForm = () => {
    return <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-gruop-lg" >
          <div className="input-group-prepend">
            <select
              className="btn mr-2"
              onChange={handleChange("category")}>
              <option value="All">Pick Category</option>
              {
                categories.map((c, i) => (
                  <option key={i} value={c._id}>{c.name}</option>
                ))
              }
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  }
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">
        {searchedProducts(result)}  </div>
    </div>
  )
}

export default Search;