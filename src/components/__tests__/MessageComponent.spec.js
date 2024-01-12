// Import fetch-mock at the top of your file
import * as fetchMock from 'fetch-mock';

import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex'

import { mount } from '@vue/test-utils';
import PostComponent from '../PostComponent.vue';
import MessageComponent from '../MessageComponent.vue';

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

describe('MessageComponent', () => {

    it('shows the "no messages related to this post" message', async () => {

        let post = {
            datum: '1705015266112',
            genreID: 1, 
            likes: 0, 
            postID: 43, 
            text: "Hello Vitest",
            titel: "Hello Vitest",
            user: {
                firstName: 'Jakob', 
                lastName: 'Hansen',
                mail: 'test@mail.com', 
                password: '1234',
                phoneNumber: '0193093284', 
                profileColor: '#000000',
                profilePicture: 'JH',
                userID: 11
            }, 
            userID: 11
        };


        const wrapper = mount(PostComponent, {
            global: {
                plugins: [store]
            }, 
            props: { post_prop: post }
        });

        fetchMock.default.mock('*', { body: JSON.stringify([]) });

        await wrapper.find('#see-more-btn').trigger('click');
        await flushPromises();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const element = wrapper.find('.messages-container');
        expect(element.exists()).toBe(true);

        const element2 = wrapper.find('.zero_messages-container');
        expect(element2.exists()).toBe(true);

        fetchMock.default.restore();
    });


    it("test elements of message component", async () => {
        let message = {
            datum: '1705015266112',
            messageID: 19, 
            postID: 46,
            text: "Hello this is a test",
            userColor: '000000', 
            userFullName: 'Jakob Hansen',
            userID: 11 
        };

        const wrapper = mount(MessageComponent, {
            props: { message_prop: message }
        });

        await wrapper.vm.$nextTick()

        const element = wrapper.find('.content-container');
        expect(element.exists()).toBe(true);
        expect(wrapper.text()).toContain('Hello this is a test');

    });


});