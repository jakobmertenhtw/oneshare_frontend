<script>
import GenreComponent from '../components/GenreComponent.vue';
import MainHeader from '../components/MainHeader.vue';
import MainModal from '../components/MainModal.vue';
import { ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    GenreComponent,
    MainHeader,
    MainModal
  }, 
  setup() {
    const isSignUp = ref(false);
    const makeSignUp = () => {
      isSignUp.value = true;
      toggleModal();
    }
    const makeSignIn = () => {
      isSignUp.value = false;
      toggleModal();
    }
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return {
      modalActive, 
      toggleModal, 
      makeSignIn, makeSignUp, isSignUp
    }
  }
}

</script>

<template>
  <MainModal @closeModal="toggleModal" :isSignUp=isSignUp :modalActive=modalActive>
    <div class="modal-content">
      <h1>Test</h1>
    </div>
  </MainModal>
  <MainHeader @openModal_SIGNIN="makeSignIn" @openModal_SIGNUP="makeSignUp" />
  <div class="content_container">
    <div class="headline-container">
      <h1>Choose your genre</h1>
      <h2>Select a genre, you are interested in. You can then see posts other people interested in Music posted. You can
        create posts and connect to other musicians. </h2>
    </div>
    <div class="genre-container">
      <GenreComponent genre-title="Jazz" image-url="./images/jazz.png" image-alt="Jazz Genre"></GenreComponent>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
}
h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  color: #000;
  opacity: .8;
  font-weight: 500;
  margin-top: -10px
};
.content_container {
  margin-top: 3rem;
}
</style>