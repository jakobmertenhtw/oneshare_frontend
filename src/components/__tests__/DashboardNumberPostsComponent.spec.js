// Import fetch-mock at the top of your file
import * as fetchMock from 'fetch-mock';

import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex'

import { mount } from '@vue/test-utils';
import DashboardNumberPostsComponent from '../DashboardNumberPostsComponent.vue';

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

// Helper function that waits for component updates
async function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('DashboardNumberPostsComponent', () => {
    it('shows the correct number of posts today', async () => {

        // Mock fetch call
        fetchMock.default.mock('*', { body: JSON.stringify([2, 3]) });

        const wrapper = mount(DashboardNumberPostsComponent, {
            global: {
                plugins: [store]
            }
        });

        // Wait for component to update after fetch call
        await flushPromises();

        expect(wrapper.text()).toContain('2');

        // Restore fetch to its original state
        fetchMock.default.restore();
    });
    it ('shows the correct number of posts this week', async () => {
        fetchMock.default.mock('*', { body: JSON.stringify([2, 3]) });

        const wrapper = mount(DashboardNumberPostsComponent, {
            global: {
                plugins: [store]
            }
        });

        await flushPromises();

        await wrapper.find('#week-btn').trigger('click');

        expect(wrapper.text()).toContain('3');

        fetchMock.default.restore();
    });
});