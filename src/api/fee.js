import api from './axios'



/* ================================
   FEES (Fee Structures)
================================ */
export const getFees = async () => {
  const response = await api.get('/fee-structures/')
  return response.data
}

export const getFeeById = async (id) => {
  const response = await api.get(`/fee-structures/${id}/`)
  return response.data
}

export const createFee = async (payload) => {
  const response = await api.post('/fee-structures/', payload)
  return response.data
}

export const updateFee = async (id, payload) => {
  const response = await api.put(`/fee-structures/${id}/`, payload)
  return response.data
}

export const deleteFee = async (id) => {
  const response = await api.delete(`/fee-structures/${id}/`)
  return response.data
}

/* ================================
   INVOICES
================================ */



export const createBulkInvoices = async (payload) => {
  /**
   * payload example:
   * {
   *   class_level: "Grade 4",
   *   term: "Term 1",
   *   fee_structure: 3
   * }
   */
  const response = await api.post('/invoices/bulk-create/', payload)
  return response.data
}


export const getInvoices = async () => {
  const response = await api.get('/invoices/')
  return response.data
}

// Get a single invoice with payments
export const getInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}/`)
  return response.data
}

// Create invoices (bulk or single, depending on backend)
export const createInvoice = async (payload) => {
  /**
   * payload example:
   * {
   *   student: 1,
   *   fee_structure: 3,
   *   amount_due: 15000
   * }
   */
  const response = await api.post('/invoices/', payload)
  return response.data
}

/* ================================
   PAYMENTS
================================ */

// List all payments (for reports)
export const getPayments = async () => {
  const response = await api.get('/payments/')
  return response.data
}


export const getPaymentById = async (id) => {
  const response = await api.get(`/payments/${id}/`)
  return response.data
}


export const recordPayment = async (payload) => {
  
  const response = await api.post('/payments/', payload)
  return response.data
}


export const updatePayment = async (id, payload) => {
  const response = await api.put(`/payments/${id}/`, payload)
  return response.data
}

export const deletePayment = async (id) => {
  const response = await api.delete(`/payments/${id}/`)
  return response.data
}
