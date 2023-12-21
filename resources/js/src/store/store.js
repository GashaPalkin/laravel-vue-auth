import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
	state() {
		return {
			count: 0,
			allPostsStore: [],
			allObjectsStoreFake: [],
			user: localStorage.getItem('user_name'),
			token: localStorage.getItem('x_xsrf_token'),
		}
	},
	mutations: {
		increment(state) {
			state.count++
		},
		decrement(state) {
			state.count--
		},
		SET_ALL_POSTS(state, payload) {
			state.allPostsStore = payload;
		},
		SET_ALL_OBJECTS_FAKE(state, payload) {
			state.allObjectsStoreFake = payload;
		},
		SET_USER: (state, payload) => {
			state.user = payload
		},
		SET_TOKEN: (state, payload) => {
			state.token = payload
		},
	},
	actions: {
		async fetchAllPosts(context) {
			await axios.get(`/api/posts`)
				.then(response => context.commit("SET_ALL_POSTS", response.data))
		},
		async fetchAllObjectsFake(context) {
			await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
				.then(response => context.commit("SET_ALL_OBJECTS_FAKE", response.data))
		},
	}
})

export default store