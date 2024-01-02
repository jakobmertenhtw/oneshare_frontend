<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import BackComponent from "../components/BackComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import CreatePostComponent from "../components/CreatePostComponent.vue";
import LoadingComponent from "../components/LoadingComponent.vue";

export default {
  name: "GenreView",
  data() {
    return {
      list: [],


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
      ], 
      genreObject: null, 
      showCreatePost: false,
      showPostList: false
    };
  },
  methods: {
    showOverlayCreatePost() {
      this.showCreatePost = true;
      document.body.style.overflow = "hidden";
    },
    hideOverlayCreatePost() {
      this.showCreatePost = false;
      document.body.style.overflow = "auto";
    },
    getPostsByGenreId(genreID) {


      const baseURL = "http://localhost:8080";
      const endpoint = baseURL + "/postsByGenre/" + genreID;

      const requestedOptions = {
        method: 'GET',
        redirect : 'follow',
      }

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then((data) => {
            
          this.postsList = data;
          
        });
    }, 
    getPostsUser() {
      this.list.forEach(post => {

        const baseURL = "http://localhost:8080";
        const endpoint = baseURL + "/users/" + post.userID;

        const requestedOptions = {
          method: 'GET',
          redirect : 'follow',
        }

        fetch(endpoint, requestedOptions)
          .then((response) => response.json())
          .then((data) => {
            post.user = data;
            
          });

      });
    }, 
    getMessagesForPost() {
      this.list.forEach(post => {
        const baseURL = "http://localhost:8080";
        const endpoint = baseURL + "/messages/" + post.postID;

        const requestedOptions = {
          method: 'GET',
          redirect : 'follow',
        }

        fetch(endpoint, requestedOptions)
          .then((response) => response.json())
          .then((data) => {
            post.messages = data;
            
          });

      })
    }

  },
  mounted() {
    const route = useRoute();
    const genre_id = ref(parseInt(route.params.id.split("=")[1]));
    this.genres.forEach(genre => {
      if (genre.id == genre_id.value) {
        this.genreObject = genre;
      }
    });
    this.getPostsByGenreId(genre_id.value);
    this.getPostsUser();
    this.getMessagesForPost();
    this.showPostList = true;
    console.log(this.list);

  },

  components: { BackComponent, PostComponent, CreatePostComponent, LoadingComponent },
};
</script>

<template>
  <div
    class="create_post-container"
    v-if="showCreatePost"
    @click="hideOverlayCreatePost"
  ></div>
  <div class="createpost-main" v-if="showCreatePost">
    <button id="close-btn" @click="hideOverlayCreatePost">
      <img src="../components/icons/close_icon.svg" alt="close" />
    </button>
    <CreatePostComponent />
  </div>
  <header>
    <BackComponent />
    <div class="create-container">
      <button class="gradient-button" @click="showOverlayCreatePost">
        CREATE POST
      </button>
    </div>
    <div class="content-container">
      <h1 v-if="genreObject">{{genreObject.name}}</h1>
    </div>
  </header>
  <div class="loader-container" v-if="!showPostList">
    <LoadingComponent size="large" color="#000" />
  </div>
  <div class="posts-content" v-if="showPostList">
    <ul class="item" v-for="item in list" :key="item.id">
      <li>
        <PostComponent :post="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.create_post-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.createpost-main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f4f4f4;
  border-radius: 15px;
  z-index: 21;
  width: 90vw;
  max-width: 40rem;
  height: 90vw;
  max-height: 35rem;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
}
#close-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  padding: 10px 12px;
}
#close-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}

header {
  min-height: 15rem;
  background: rgba(0, 0, 0, 0.05);
  color: black;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.create-container {
  display: flex;
  justify-content: flex-end;
}
.create-container button {
  border: none;
  outline: none;
  background: linear-gradient(to right, #5200ff, #9e00ff);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  padding: 14px 22px;
}
.create-container button:hover {
  transform: scale(1);
}
.content-container {
  flex: 1;
  display: flex;
  align-items: end;
}
h1 {
  font-size: 4rem;
  margin-left: 3rem;
}
ul {
  width: 80vw;
  margin: auto;
  max-width: 90rem;
  list-style: none;
  margin-top: 3rem;
}
.loader-container {
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15rem;
}

</style>
