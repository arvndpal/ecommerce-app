import { API } from '../config'
import queryString from 'query-string'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const getCategories = () => {
    return fetch(`${API}/category`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }
    console.log(data)
    return fetch(`${API}/products/by/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const list = (params) => {
    const query = queryString.stringify(params)
    console.log('query', query)
    return fetch(`${API}/products/search?${query}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
            method: 'GET'
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(createOrderData)
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log('error=>', error)
        })
}