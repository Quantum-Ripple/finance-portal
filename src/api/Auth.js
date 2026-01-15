import api from './axios'

export default {
  async login(username, password) {
    
    const response = await api.post('/token/', { username, password })
    const { access, refresh } = response.data

    
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    
    const userResponse = await api.get('/users/me/')
    const userData = userResponse.data

    
    localStorage.setItem('user', JSON.stringify(userData))

    console.log(userData)

    return userData
  },

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  },

  isAuthenticated() {
    const token = localStorage.getItem('access_token')
    return !!token
  },

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  },


  async ChangePassword(oldPassword, newPassword) {
  try {
    const response = await api.put('password-change/', {
      old_password: oldPassword,
      new_password: newPassword
    });

    return response.data;

  } catch (error) {
    console.log("Caught Error:", error);

    if (error.response) {
      throw error.response.data;
    }

    throw error;
  }

}
}