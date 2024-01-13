<script>
import UserMenu from "../components/UserMenu.vue";

export default {
  name: "UserView",
  components: { UserMenu },
  data() {
    return {
      showMenu: true,
    };
  },
  mounted() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    open() {
      this.showMenu = true;
    },
    close() {
      this.showMenu = false;
    },
  },
};
</script>

<template>
  <div class="user-view">
    <div class="hamburger-icons" v-if="!showMenu" @click="open">
      <div class="hamburger-element" id="first_hamburger"></div>
      <div class="hamburger-element" id="second_hamburger"></div>
      <div class="hamburger-element" id="third_hamburger"></div>
    </div>
    <div class="close-icon-container" v-if="showMenu" @click="close">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
          fill="white"
        />
      </svg>
    </div>
    <UserMenu v-if="showMenu" />
    <div class="router-container">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.hambuger-icons {
  display: none;
}
.close-icon-container {
  display: none;
}
.user-view {
  display: flex;
  height: 100vh;
  max-width: 100vw;
}
.router-container {
  flex: 1;
  overflow-x: auto;
}
@media (max-width: 768px) {
  .user-view {
    flex-direction: column;
    height: auto;
  }
  .hamburger-icons {
    z-index: 5;
    display: flex;
    position: fixed;
    background-color: black;
    top: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    border-radius: 10px;
  }
  .hamburger-icons div {
    height: 2px;
    background-color: white;
    border-radius: 2px;
  }
  #first_hamburger {
    width: 50%;
  }
  #second_hamburger {
    width: 50%;
  }
  #third_hamburger {
    width: 50%;
  }
  .hambuger-icons:hover {
    opacity: 0.8;
  }

  .close-icon-container {
    border-radius: 10px;
    display: flex;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background-color: black;
  }
  .close-icon-container:hover {
    opacity: 0.8;
  }

}
</style>
