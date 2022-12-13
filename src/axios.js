import axios from 'axios'
const API = axios.create({
    baseURL: 'https://fmbackend.onrender.com/'
})

API.interceptors.request.use((req) => {
    return req
})

export const register = async (userData) => {

    let reg = await API.post("/user/register", userData)
    return reg;
}

export const payment = async (cardData)=>{
    let reg = await API.post("/payment/pay", cardData)
    return reg;
}

export const booking = async (bookData)=>{
    let reg = await API.post("/booking/book", bookData)
    return reg;
}