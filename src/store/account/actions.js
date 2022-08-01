import axios from 'axios'
export function getUser (context, payload) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + payload.data
    }
  }
  axios.get('http://localhost:8000/api/user', config)
    .then((res) => {
      context.commit('UpdateUSer', res.data)
    }).catch(error => {
      console.log(error)
      localStorage.clear()
      location.reload()
    })
}
export function login (context, payload) {
  const formData = new FormData()
  formData.append('email', payload.email)
  formData.append('password', payload.password)

  payload.$axios.post('http://localhost:8000/api/login', formData)
    .then((res) => {
      payload.loading = false
      localStorage.setItem('token', res.data.token)
      context.commit('UpdateUSer', res.data.data)
      payload.$router.replace('/')
    }).catch(error => {
      payload.loading = false
      payload.$q.notify({
        message: 'Invalid credentials!',
        progress: true,
        type: 'negative',
        position: 'bottom-right'
      }, 1000)
      console.log(error)
    })
}
export function register (context, payload) {
  const formData = new FormData()
  formData.append('email', payload.email)
  formData.append('password', payload.password)

  payload.$axios.post('http://localhost:8000/api/register', formData)
    .then((res) => {
      payload.loading = false
      localStorage.setItem('token', res.data.token)
      context.commit('UpdateUSer', res.data.data)
      payload.$router.replace('/')
    }).catch(error => {
      payload.loading = false
      payload.$q.notify({
        message: error.response.data.message,
        progress: true,
        type: 'negative',
        position: 'bottom-right'
      }, 1000)
      console.log(error.response.data)
    })
}
