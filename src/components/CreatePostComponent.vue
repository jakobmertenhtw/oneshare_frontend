<script>
import { ref } from "vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: "CreatePostComponent",

  data() {
    return {
      userID: this.$store.getters.getUserId,
      genreID: this.$route.params.id.split("=")[1],
    };
  },

  setup() {

    const title = ref('');
    const description = ref('');

    let isLoading = ref(false);

    return {
      title,
      description,
      isLoading
    };

  }, 

  methods: {
    createPost() {

      if (!this.$store.getters.isLoggedIn) {
        window.alert("You need to be logged in to create a post!");
        return;
      }

      if (this.title === "" || this.description === "") {
        window.alert("Please fill out all required fields!");
        return;
      }

      this.isLoading = true;

      let post = {
        userID: this.userID,
        genreID: this.genreID,
        titel: this.title,
        text: this.description,
        likes: 0,
      };

      const endpoint = 'http://localhost:8080/post';
      const requestedOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }


      fetch(endpoint, requestedOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === 500) {
            window.alert(result.message)
            return;
          }
          this.isLoading = false;
          setTimeout(() => {
            this.$emit('hideCreatePostAndLoadPosts');
          }, 300);
        })
        .catch(error => console.log('error', error));
    },

  },
  components: {
    LoadingComponent
  },
  emits: ['hideCreatePostAndLoadPosts']

};
</script>

<template>
  <h2>Create a new post</h2>
  <div class="form-container">
    <input
      type="text"
      id="post_title"
      name="post_title"
      v-model="title"
      placeholder="Whats your posts title?"
    />
    <textarea
      name="post_description"
      id="post_description"
      cols="30"
      v-model="description"
      placeholder="Type your message hear."
    ></textarea>
    <button id="create-post_btn" @click="createPost">
      <span v-if="!isLoading">CREATE POST</span>
      <LoadingComponent size="small" color="white" v-if="isLoading"/>
    </button>
  </div>
</template>

<style scoped>
h2 {
    font-size: 2rem;
}
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
    flex: 1;
}
.form-container input {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 7px;
    font-weight: 500;
}
.form-container input:focus {
    border: 1px solid;
}
.form-container textarea {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 7px;
    resize: none;
    flex: 1;
}
.form-container textarea:focus {
    border: 1px solid;
}
#create-post_btn {
    width: fit-content;
    border: none;
    outline: none;
    background-color: #000;
    color: white;
}


</style>
