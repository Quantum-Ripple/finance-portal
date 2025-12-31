import api from './axios'

export const overview = async() => {
    const response = await api.get('/overview/')
    return response.data
}


export const feeByMonth = async()=>{
    const response = await api.get('/fees-by-month')
    return response.data
}


export const feeByClass = async()=>{
    const response = await api.get('/fees-by-class')
    return response.data
}