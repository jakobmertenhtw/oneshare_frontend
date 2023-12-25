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
  data() {
    return {
      // Schreibe mir eine Liste für genres mit 12 elemente, alle haben eine id, name, imagepath und imagealt
      genres: [
        {
          id: 1,
          name: 'Jazz',
          imagepath: './images/jazz.png',
          imagealt: 'Jazz Genre'
        },
        {
          id: 2,
          name: 'Klassik',
          imagepath: './images/klassik.png',
          imagealt: 'Rock Genre'
        },
        {
          id: 3,
          name: 'Hip Hop',
          imagepath: './images/hiphop.png',
          imagealt: 'Hip Hop Genre'
        },
        {
          id: 4,
          name: 'Pop',
          imagepath: './images/pop.png',
          imagealt: 'Pop Genre'
        },
        {
          id: 5,
          name: 'EDM',
          imagepath: './images/edm.png',
          imagealt: 'EDM Genre'
        },
        {
          id: 6,
          name: 'Heavy Metal',
          imagepath: './images/heavymetal.png',
          imagealt: 'Heavy Metal Genre'
        },
        {
          id: 7,
          name: 'Rock',
          imagepath: './images/rock.png',
          imagealt: 'Rock Genre'
        },
        {
          id: 8,
          name: 'Funk',
          imagepath: './images/funk.png',
          imagealt: 'Funk Genre'
        }
      ]
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
  }
}

</script>

<template>
  <MainModal @closeModal="toggleModal" :isSignUp=isSignUp :modalActive=modalActive @update:isSignUp="value => isSignUp = value">
  </MainModal>
  <MainHeader @openModal_SIGNIN="makeSignIn" @openModal_SIGNUP="makeSignUp" />
  <div class="content_container">
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