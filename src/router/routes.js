
//import auth from '../store/modules/auth'
/*
const ifNotAuthenticated = (to, from, next) => {
	if (!auth.getters.isAuthenticated) {
		next()
		return
	}
	next('/')
}

const ifAuthenticated = (to, from, next) => {
	if (auth.getters.isAuthenticated) {
		next()
		return
	}
	next('/login')
}
*/

const routes = [
	{

		path: '/',
		component: () => import('layouts/Layout.vue'),
		children: [
			{ path: '/notes', component: () => import('pages/PageNotes.vue') },
			{ path: '/users', component: () => import('pages/PageUsers.vue') },
			{ path: '/user', component: () => import('pages/PageUserNote.vue') },
			{ path: '/account', component: () => import('pages/PageAccount.vue') },
		],

	},
	{
		path: '/login',

		component: () => import('layouts/HomeLayout.vue'),
		children: [

			{ path: '/login', component: () => import('pages/PageLogin.vue') },
			{ path: '/register', component: () => import('pages/PageRegister.vue') },

		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '*',
		component: () => import('pages/Error404.vue')
	}

]

export default routes
