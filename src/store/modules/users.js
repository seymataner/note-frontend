import axios from 'axios'
axios.defaults.baseURL = 'https://note-backend-seyma.herokuapp.com/'

const state = {
	userList: [],
	user_id :null

}

const mutations = { // state i güncel tutar.
	SET_USERS: (state, userList) => {
		state.userList = userList
	},	
}

const actions = {
	async fetchUsers ({ commit }) {
		const response = await axios.get('/users');
		commit('SET_USERS', response.data)
	}
}
const getters = {

	userList: (state) => state.userList,

	user: (state) => state.user
	/*
	userlist: (state) => {
		return state.userList
	}

	*/

}
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
