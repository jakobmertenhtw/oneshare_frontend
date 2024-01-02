import { createStore } from "vuex";
import router from '/src/router/index.js';
import { watch } from 'vue';

const store =  createStore({
    state: {
        loggedIn: false,
        userid: null
    },
    getters: {
        isLoggedIn: (state) => {
            return state.loggedIn;
        },
        getUserId: (state) => {
            return state.userid;
        }
    },
    mutations: {
        setLoggedIn(state, value) {
            state.loggedIn = value;
        }, 
        setUserId(state, value) {
            state.userid = value;
        }
    },
    actions: {
        login({ commit }, userid) {
            commit("setLoggedIn", true);
            commit("setUserId", userid);
        }, 
        logout ({ commit }) {
            commit("setLoggedIn", false);
            commit("setUserId", null);
        }
    },
    modules: {

    }
});

export default store;

watch(() => store.state.loggedIn, (loggedIn) => {
    if (loggedIn) {
        router.push({ name: 'user' });
        localStorage.setItem('loggedIn', store.state.userid);
    } else {
        router.push({ name: 'home' });
        localStorage.removeItem('loggedIn');
    }
});