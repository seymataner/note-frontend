import axios from 'axios'
axios.defaults.baseURL = 'https://note-backend-seyma.herokuapp.com/'

const state = {
	status: '',
	token: localStorage.getItem('user-token') || '',
	user: null
};

const getters = {
	isAuthenticated: (state) => !!state.token,
	authStatus: (state) => state.status
};

const actions = {
	login ({ commit }, user) {
		axios({ url: '/index/login', data: user, method: 'POST' })
			.then(resp => {
				const token = resp.data.token
				const user = resp.data.username
				const id = resp.data._id
				localStorage.setItem('user-token', token)
				localStorage.setItem('user-name', user)
				localStorage.setItem('user-id',id)
				axios.defaults.headers.common['Authorization'] = token
				commit('AUTH_SUCCESS', resp.data)
				this.$router.push('/account')
			})
			.catch(err => {
				resp.json(err)
				commit('AUTH_ERROR')
				localStorage.removeItem('token')
			})
	},
	register({commit}, user){
			axios({url: 'index/register', data: user, method: 'POST' })
			.then(resp => {
				commit('AUTH_SUCCESS_REGISTER')
				this.$router.push('/login')
			})
			.catch(err => {
				commit('AUTH_ERROR', err)
			})
	},
	logout ({ commit }) {
		commit('AUTH_LOGOUT')
		localStorage.removeItem('user-token')
		localStorage.removeItem('user-name')
		localStorage.removeItem('user-id')
		delete axios.defaults.headers.common['Authorization']
	}
};

const mutations = {
	AUTH_SUCCESS (state, data) {
		state.status = 'success'
		state.token = data.token
		state.user = {
			username: data.username,
			id: data._id
		}
	},
	AUTH_SUCCESS_REGISTER (state) {
		state.status = 'success'
	},
	AUTH_LOGOUT (state) {
		state.status = ''
		state.token = ''
		state.user = ''
	},
	AUTH_ERROR (state) {
		state.status = 'error'
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};