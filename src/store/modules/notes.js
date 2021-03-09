import axios from 'axios'
axios.defaults.baseURL = 'https://note-backend-seyma.herokuapp.com/' 

const state = {
	noteList : [],
	userNoteList : []
}

const mutations = {

	SET_NOTE: (state, noteList) => {
		state.noteList = noteList
	},
	SET_USER_NOTE:(state,userNoteList) => {
		state.userNoteList = userNoteList
		console.log(state.userNoteList)
	},
	ADD_NOTE:(state, noteData) => {
		state.noteList.unshift(noteData)
	},
	DELETE_NOTE:(state,id) => { 
		state.noteList = state.noteList.filter(note => note._id !== id)
	},
	UPDATE_NOTE :(state,changedData) => {
		const index = state.noteList.findIndex(note => note._id === changedData._id);
        if(index !== -1) {
            state.noteList.splice(index, 1, changedData)
        }
	}
}

const actions = { 
	async fetchNotes( { commit }) {
		const response =  await axios.get('/notes');	
		commit('SET_NOTE',response.data)
	},
	async fetchUserNotes( { commit }, id) {
		const response =  await axios.get('/users/'+ id);
		commit('SET_USER_NOTE',response.data[0].myNotes)
	},
	async pushNote( { commit }, noteData) {
		const response =  await axios.post('/notes',noteData);	
		commit('ADD_NOTE',response.data)
	},
	async deleteNote( { commit }, id) {
		const response =  await axios.delete('/notes/'+ id);	
		commit('DELETE_NOTE',id)
	},
	async updateNote( { commit }, changedData) {
		const response =  await axios.put('notes/'+ changedData._id, changedData);
		commit('UPDATE_NOTE',changedData)
	}
}

const getters = {
	noteList: (state) => state.noteList,
	userNoteList: (state) => state.userNoteList
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
