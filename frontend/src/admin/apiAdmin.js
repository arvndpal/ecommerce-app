import { API } from '../config';

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}


export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const getCategories = () => {
    return fetch(`${API}/category`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status, orderId })
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

/**
 * Perform crud on products
 * get all products
 * get a single product
 * upadate the products
 * delete the product
 * 
 */
export const getProducts = () => {
    return fetch(`${API}/products`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: product
        })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log("error=>", error)
        })
}