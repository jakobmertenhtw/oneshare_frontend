import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PostComponent from "../PostComponent.vue";
import { createStore } from "vuex";

import * as fetchMock from "fetch-mock";

// Helper function that waits for component updates
async function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

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


describe("PostComponent", () => {
  it("renders properly", () => {
    let post = {
      datum: "1705015266112",
      genreID: 1,
      likes: 0,
      postID: 43,
      text: "Hello Vitest",
      titel: "Hello Vitest",
      user: {
        firstName: "Jakob",
        lastName: "Hansen",
        mail: "test@mail.com",
        password: "1234",
        phoneNumber: "0193093284",
        profileColor: "#000000",
        profilePicture: "JH",
        userID: 11,
      },
      userID: 11,
    };

    const wrapper = mount(PostComponent, { props: { post_prop: post } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });

  it("shows that liking functionality works", async () => {
    let post = {
      datum: "1705015266112",
      genreID: 1,
      likes: 0,
      postID: 43,
      text: "Hello Vitest",
      titel: "Hello Vitest",
      user: {
        firstName: "Jakob",
        lastName: "Hansen",
        mail: "test@mail.com",
        password: "1234",
        phoneNumber: "0193093284",
        profileColor: "#000000",
        profilePicture: "JH",
        userID: 11,
      },
      userID: 11,
    };

    let like_post = {
      datum: "1705015266112",
      genreID: 1,
      likes: post.likes + 1, 
      postID: 48, 
      test: 'slnv', 
      titel: 'alws', 
      userID: 23
    }

    const wrapper = mount(PostComponent, {
      global: {
        plugins: [store],
      },
      props: { post_prop: post },
    });


    fetchMock.default.mock('*', { body: JSON.stringify(like_post) });

    await flushPromises();

    const element = wrapper.find("#like-btn");
    // click on like button
    await element.trigger("click");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const like_number = wrapper.find("#number_likes");

    expect(like_number.text()).toContain(like_post.likes);



  });
});
