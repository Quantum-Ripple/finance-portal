import api from './axios'


export const getExpense = async() => {
    const response = await api.get('/expenditures/')
    return response.data
}
export const getExpenseDetail = async(id) => {
    const response = await api.get(`/expenditures/${id}/`)
    return response.data
}

export const createExpense = async(payload) =>{
    const response = await api.post('/expenditures/', payload)
    return response.data
}
export const updateExpense = async(id,payload) => {
    const response = await api.patch(`/expenditures/${id}/`,payload)
    return response.data
}
export const deleteExpense = async(id) => {
    const response = await api.delete(`/expenditures/${id}/`)
    return response.data
}