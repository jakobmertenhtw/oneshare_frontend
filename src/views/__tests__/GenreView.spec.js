import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import GenreView from '../GenreView.vue'

/*function createFetchResponse(data) {
    return { json: () => Promise.resolve(data) }
}
*/


const store = createStore({
  state: {
    loggedIn: false,
    userid: null,
  },
  getters: {
    isLoggedIn: () => true,
    getUserId: () => 11,
  },
  mutations: {
    setLoggedIn: () => {},
    setUserId: () => {},
  },
  actions: {
    login: () => {},
    logout: () => {},
  },
});

const router = createRouter({ 
  history: createMemoryHistory(),
  routes: [
    { 
      path: '/genre/:id', 
      name: 'genre', 
      component: GenreView
    }
  ]
});

describe('GenreView', () => {

  it('shows CREATE POST button', async () => {


    await router.push({ name: 'genre', params: { id: '1' } });

    const wrapper = mount(GenreView, {
      global: {
        plugins: [store, router]
      }
     });
    expect(wrapper.text()).toContain('CREATE POST');
  });

})