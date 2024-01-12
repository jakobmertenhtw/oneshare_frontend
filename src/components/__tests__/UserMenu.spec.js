// Import fetch-mock at the top of your file
import * as fetchMock from "fetch-mock";

import { describe, it, expect } from "vitest";
import { createStore } from "vuex";

import { mount } from "@vue/test-utils";
import UserMenu from "../UserMenu.vue";
import { nextTick } from 'vue'

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
  return new Promise((resolve) => setImmediate(resolve));
}

describe("UserMenu", () => {
  it("loads shows the correct user data", async () => {
    const user = {
      firstName: "Jakob",
      lastName: "Merten",
      mail: "this_@test.de",
      password: "1234",
      phoneNumber: "0193093284",
      profileColor: "B05050",
      profilePicture: "JM",
      userID: 23,
    };

    fetchMock.default.mock('*', { body: JSON.stringify(user) });

    const wrapper = mount(UserMenu, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises();

    await new Promise(resolve => setTimeout(resolve, 1000));

    const element = wrapper.find("#username");
    expect(element.exists()).toBe(true);
    expect(element.text()).toContain("Jakob Merten");
    expect(wrapper.text()).toContain("this_@test.de");
    


    fetchMock.default.restore();
  });
});
