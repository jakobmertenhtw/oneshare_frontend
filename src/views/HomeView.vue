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
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return {
      modalActive, 
      toggleModal
    }
  }
}

</script>

<template>
  <MainModal @closeModal="toggleModal" :modalActive=modalActive>
    <div class="modal-content">
      <h1>Test</h1>
    </div>
  </MainModal>
  <MainHeader @openModal="toggleModal" />
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