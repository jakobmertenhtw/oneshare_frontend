import { createStore } from "vuex";
import router from '/src/router/index.js';
import { watch } from 'vue';

const store =  createStore({
    state: {
        loggedIn: false,
    },
    getters: {
        isLoggedIn: (state) => {
            return state.loggedIn;
        },
    },
    mutations: {
        setLoggedIn(state, value) {
            state.loggedIn = value;
        }
    },
    actions: {
        login({ commit }) {
            commit("setLoggedIn", true);
        }, 
        logout ({ commit }) {
            commit("setLoggedIn", false);
        }
    },
    modules: {

    }
});

export default store;

watch(() => store.state.loggedIn, (loggedIn) => {
    if (loggedIn) {
        router.push({ name: 'user' });
        localStorage.setItem('loggedIn', true);
    } else {
        router.push({ name: 'home' });
        localStorage.removeItem('loggedIn');
    }
});