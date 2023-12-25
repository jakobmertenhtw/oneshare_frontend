<script>
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
export default {
  name: "MainModal",
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
    isSignUp: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeModal"],
  components: { SignUp, SignIn },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("closeModal");
    };
    const updateIsSignUp = (value) => {
      emit("update:isSignUp", value);
    };

    return {
      closeModal,
      updateIsSignUp
    };
  },
};
</script>

<template>
  <button
    class="modal-backround"
    v-show="modalActive"
    @click="closeModal"
  ></button>
  <div class="main-modal" v-show="modalActive">
    <div class="close-container">
      <button class="close-btn" @click="closeModal">
        <img src="./icons/close_icon.svg" alt="close" />
      </button>
    </div>
    <div class="modal-content">
      <SignIn v-if="!isSignUp" @update:isSignUp="updateIsSignUp" />
      <SignUp v-if="isSignUp" @update:isSignUp="updateIsSignUp" />
    </div>
  </div>
</template>

<style scoped>
.main-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #f4f4f4;
  width: 90vw;
  max-width: 45rem;
  border-radius: 20px;
}

.modal-backround {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.4;
  outline: none;
  border: none;
  border-radius: 0;
}

.modal-content {
  margin: 3rem 2rem;
}

.close-btn {
  border: none;
  background-color: transparent;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
}

.close-btn:hover {
  cursor: pointer;
}
</style>
