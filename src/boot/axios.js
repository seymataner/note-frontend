import axios from 'axios' 
const axiosInstance = axios.create({ 
  baseURL: 'https://note-backend-seyma.herokuapp.com/'
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }

