<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import BackComponent from "../components/BackComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import CreatePostComponent from "../components/CreatePostComponent.vue";

export default {
  name: "GenreView",
  data() {
    return {
      list: [
        {
          postID: 1,
          userID: 1,
          genreID: 1,
          title: "Test Title 1",
          text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          likes: 3,
          datum: "2021-06-01",
        },
        {
          postID: 2,
          userID: 1,
          genreID: 1,
          title: "Test Title 2",
          text: "Test Text 3",
          likes: 3,
          datum: "2021-06-01",
        },
        {
          postID: 3,
          userID: 1,
          genreID: 1,
          title: "Test Title 3",
          text: "Test Text 3",
          likes: 102,
          datum: "2021-06-01",
        },
        {
          postID: 4,
          userID: 1,
          genreID: 1,
          title: "Test Title 4",
          text: "Test Text 4",
          likes: 3,
          datum: "2021-06-01",
        },
      ],
      showCreatePost: false,
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
  },
  async mounted() {
    const route = useRoute();
    const genre_id = ref(route.params.id);
    console.log(genre_id);
  },
  components: { BackComponent, PostComponent, CreatePostComponent },
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
      <h1>Jazz</h1>
    </div>
  </header>
  <div class="posts-content">
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
</style>
