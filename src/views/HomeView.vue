<script>
import GenreComponent from '../components/GenreComponent.vue';
import MainHeader from '../components/MainHeader.vue';
import MainModal from '../components/MainModal.vue';
import LoadingComponent from '../components/LoadingComponent.vue';
import { ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    GenreComponent,
    MainHeader,
    MainModal, 
    LoadingComponent
  }, 
  data() {
    return {
      showGenres: false, 
      genres: []
    }
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
  }, 
  mounted() {
    // get genres from backend
    const baseURL = 'http://localhost:8080/';
    const endpoint = baseURL + 'genres';
    const requestedOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };


    fetch(endpoint, requestedOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.genres = data;
        this.showGenres = true;
      })
      .catch(error => console.log('error', error));

  }
}

</script>

<template>
  <MainModal @closeModal="toggleModal" :isSignUp=isSignUp :modalActive=modalActive @update:isSignUp="value => isSignUp = value">
  </MainModal>
  <MainHeader @openModal_SIGNIN="makeSignIn" @openModal_SIGNUP="makeSignUp" v-if="showGenres" />
  <div class="content_container" v-if="showGenres">
    <div class="headline-container">
      <h1>Choose your genre</h1>
      <h2>Select a genre, you are interested in. You can then see posts other people interested in Music posted. You can
        create posts and connect to other musicians. </h2>
    </div>
    <div class="genre-container">
      <ul class="item" v-for="item in genres" :key="item.id">
      <li>
        <GenreComponent :genre="item" />
      </li>
    </ul>
    </div>
  </div>
  <div class="loading-container" v-if="!showGenres">
    <LoadingComponent size="large" color="black" />
  </div>
</template>

<style scoped>
.loading-container {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
}
h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25rem;
  color: #000;
  opacity: .8;
  font-weight: 400;
  margin-top: .5rem; 
};
.content_container {
  margin-top: 3rem;
}
.genre-container {
  margin-top: 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 3rem;
  list-style-type: none;
  padding: 0;
}
ul li {
  display: inline-block;
}
</style>