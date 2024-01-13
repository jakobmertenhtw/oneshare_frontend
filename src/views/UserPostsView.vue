<script>
import LoadingComponent from "../components/LoadingComponent.vue";
export default {
  name: "UserPostsView",
  data() {
    return {
      postsLoaded: false,

      currentUser: {},
      allPosts: [],
      allGenres: [],
      genres: [],

      genrePosts: [],
      deleteModal: false,
      editModal: false,

      currentPostID: 0,
      currentPost: {},
    };
  },
  methods: {
    showDeleteModal(postID) {
      // scroll to top of the page
      window.scrollTo(0, 0);

      this.currentPostID = postID;
      this.deleteModal = true;
    },
    showEditModal(postID) {
      // scroll to top of the page
      window.scrollTo(0, 0);

      this.currentPostID = postID;
      this.editModal = true;
      this.allPosts.forEach((element) => {
        if (element.postID == postID) {
          this.currentPost = element;
        }
      });
    },
    dismissDeleteModal() {
      this.deleteModal = false;
    },
    dismissEditModal() {
      this.editModal = false;
    },
    dismissAllModals() {
      this.deleteModal = false;
      this.editModal = false;
    },
    deletePost() {
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
      let endpoint = baseURL + "deletePost/" + this.currentPostID;

      let requestedOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(endpoint, requestedOptions)
        .then(() => {
          window.alert("Post deleted!");
          this.getAllPosts();
          this.dismissDeleteModal();
        })
        .catch((error) => {
          window.alert("Something went wrong! Please try again later!");
          console.log(error);
        });
    },
    editPost() {
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
      let endpoint = baseURL + "editPost/" + this.currentPostID;

      let post = {
        postID: this.currentPostID,
        userID: this.currentPost.userID,
        genreID: this.currentPost.genreID,
        titel: this.currentPost.titel,
        text: this.currentPost.text,
        likes: this.currentPost.likes,
        datum: this.currentPost.datum,
      };

      let requestedOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      };

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then(() => {
          window.alert("Post edited!");
          this.getAllPosts();
          this.dismissEditModal();
        })
        .catch((error) => {
          window.alert("Something went wrong! Please try again later!");
          console.log(error);
        });
    },

    async getAllPosts() {
      // get all posts for one user
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
      const user_id = this.$store.getters.getUserId;
      let endpoint = baseURL + "postsByUser/" + user_id;

      let requestedOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(endpoint, requestedOptions);
        const data = await response.json();
        this.allPosts = data;

        this.getGenresForPostsAndCurrentUser();
      } catch (error) {
        window.alert("Something went wrong! Please try again later!");
        console.log(error);
        return;
      }
    },

    async getGenresForPostsAndCurrentUser() {
      // get all genres
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
      let endpoint = baseURL + "genres";

      let requestedOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(endpoint, requestedOptions);
        const data = await response.json();
        this.allGenres = data;

        let genres = [];

        this.allPosts.forEach((element) => {
          this.allGenres.forEach((genre) => {
            if (element.genreID == genre.id && !genres.includes(genre)) {
              genres.push(genre);
            }
          });
        });
        this.genres = genres;

        // get current user
        let user_endpoint = baseURL + "users/" + this.$store.getters.getUserId;

        let requestedOptionsUser = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const userResponse = await fetch(user_endpoint, requestedOptionsUser);
        const userData = await userResponse.json();

        this.currentUser = userData;
      } catch (error) {
        window.alert("Something went wrong! Please try again later!");
        console.log(error);
        return;
      }

      this.constructGenrePostsArray();
    },

    constructGenrePostsArray() {
      let genrePosts = [];

      this.genres.forEach((element) => {
        element.posts = [];
        this.allPosts.forEach((post) => {
          if (post.genreID == element.id) {
            element.posts.push({
              id: post.postID,
              title: post.titel,
              description: post.text,
              user: {
                id: this.currentUser.userID,
                firstname: this.currentUser.firstName,
                lastname: this.currentUser.lastName,
                description: this.currentUser.mail,
                profileName: this.currentUser.profilePicture,
                profileColor: this.currentUser.profileColor,
              },
            });
          }
        });

        genrePosts.push({
          genreID: element.genreID,
          name: element.name,
          posts: element.posts,
        });
      });

      this.genrePosts = genrePosts;
      this.postsLoaded = true;
    },
  },
  mounted() {
    this.getAllPosts();
  },
  components: {
    LoadingComponent,
  },
};
</script>

<template>
  <div class="my-posts-main-container">
    <h1>My Posts</h1>
    <div v-if="!postsLoaded" class="loading-animation-container">
      <LoadingComponent size="large" color="black" />
    </div>
    <div v-if="postsLoaded">
      <div
        v-for="(genre, index) in genrePosts"
        :key="index"
        class="genrePosts-container"
      >
        <h2>{{ genre.name }}</h2>
        <div
          v-for="post in genre.posts"
          :key="post.id"
          class="post-container-all"
        >
          <div class="post-main-container">
            <div class="post-user-information-container">
              <div class="profile-picture-container">
                <div
                  class="profile-picture-background-container"
                  :style="{ backgroundColor: '#' + post.user.profileColor }"
                ></div>
                <div
                  class="profile-picture-text"
                  :style="{ color: '#' + post.user.profileColor }"
                >
                  {{ post.user.profileName }}
                </div>
              </div>
              <div class="profile-information-container">
                <h5>{{ post.user.firstname + " " + post.user.lastname }}</h5>
                <p>{{ post.user.description }}</p>
              </div>
            </div>
            <div class="post-content-container">
              <h3>{{ post.title }}</h3>
              <p id="post-content-text">{{ post.description }}</p>
            </div>
          </div>
          <div class="post-edit-container">
            <div class="edit-post-container">
              <button id="edit-post-btn" @click="showEditModal(post.id)">
                <img src="../components/icons/edit_icon.svg" alt="Edit Post" />
              </button>
            </div>
            <div class="delete-post-container">
              <button id="delete-post-btn" @click="showDeleteModal(post.id)">
                <img
                  src="../components/icons/delete_icon.svg"
                  alt="Delete Post"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    id="overlay-background"
    v-if="deleteModal || editModal"
    @click="dismissAllModals"
  ></div>
  <div class="overlay-container-delete" v-if="deleteModal">
    <h3>Are you sure?</h3>
    <p>Do you really want to delete the post: 'This is a test title'?</p>
    <div class="delete-buttons-container">
      <button id="delete-btn-delete" @click="deletePost">DELETE</button>
      <button id="cancel-btn-delete" @click="dismissDeleteModal">CANCEL</button>
    </div>
  </div>
  <div class="overlay-container-edit" v-if="editModal">
    <h2>Edit Post</h2>
    <input type="text" v-model="this.currentPost.titel" id="edit-post-title" />
    <textarea
      name="description-edit-post"
      id="edit-post-description"
      cols="30"
      rows="10"
      v-model="this.currentPost.text"
    ></textarea>
    <div class="edit-buttons-container">
      <button id="edit-btn-edit" @click="editPost">EDIT</button>
      <button id="cancel-btn-edit" @click="dismissEditModal">CANCEL</button>
    </div>
  </div>
</template>

<style scoped>
#overlay-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  top: 0;
  left: 0;
}
.overlay-container-delete {
  position: absolute;
  z-index: 11;
  background-color: #f4f4f4;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 15px;
}
.overlay-container-delete h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.overlay-container-delete p {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2rem;
}
.delete-buttons-container {
  display: flex;
  gap: 1rem;
}
.delete-buttons-container #delete-btn-delete {
  background-color: #ee4c4c;
}
.delete-buttons-container #cancel-btn-delete {
  background-color: #222;
  color: #fff;
}
.delete-buttons-container button {
  border: none;
  outline: none;
}

.overlay-container-edit {
  position: absolute;
  z-index: 11;
  background-color: #f4f4f4;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 2rem;
  border-radius: 15px;
}
.overlay-container-edit h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.overlay-container-edit input {
  width: 100%;
  padding: 1rem 1.2rem;
  border: none;
  outline: none;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 500;
}
.overlay-container-edit input:focus {
  border: 1px solid #222;
}
.overlay-container-edit textarea {
  width: 100%;
  padding: 1rem 1.2rem;
  border: none;
  outline: none;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 7px;
  resize: none;
  font-size: 1rem;
  font-weight: 400;
}
.overlay-container-edit textarea:focus {
  border: 1px solid #222;
}
.edit-buttons-container {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}
.edit-buttons-container button {
  border: none;
  outline: none;
}
.edit-buttons-container #edit-btn-edit {
  background-color: #4c83ee;
  color: #fff;
}
.edit-buttons-container #cancel-btn-edit {
  background-color: #222;
  color: #fff;
}

.my-posts-main-container {
  padding: 7rem 4rem;
}
.loading-animation-container {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.genrePosts-container {
  margin-top: 2.5rem;
}
.genrePosts-container h2 {
  font-weight: 600;
  font-size: 1.3rem;
  border-bottom: 1px solid;
  padding-bottom: 1rem;
  width: fit-content;
  padding-right: 2rem;
  margin-bottom: 1rem;
}
.post-container-all {
  display: flex;
  gap: 1.5rem;
}
.post-main-container {
  background-color: white;
  border-radius: 20px;
  flex: 1;
  padding: 2rem;
  display: flex;
  margin-bottom: 1.3rem;
}
.post-user-information-container {
  border-right: 1px solid #e5e5e5;
  padding-right: 1rem;
  display: flex;
  gap: 1rem;
  min-width: 13rem;
}
.profile-picture-container {
  width: 3rem;
  height: 3rem;
  border-radius: 7px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-picture-background-container {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.2;
}
.profile-information-container {
  max-width: 8rem;
  max-height: 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.profile-information-container h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.profile-information-container p {
  font-size: 0.7rem;
  font-weight: 400;
}
.post-content-container {
  padding-left: 1rem;
}
.post-content-container h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-bottom: 1rem;
}
.post-content-container p {
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.5rem;
}

.post-edit-container button {
  padding: 13px 15px;
  margin-bottom: 10px;
  border: none;
  outline: none;
}
#edit-post-btn {
  background-color: #4c83ee;
}
#delete-post-btn {
  background-color: #ee4c4c;
}

@media (max-width: 1200px) {
  .post-user-information-container {
    flex-direction: column;
    gap: 1rem
  }
  .post-user-information-container {
    min-width: 9rem;
  }
}
 
@media (max-width: 768px) {
  .post-container-all {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 1.3rem;
  }
  .post-edit-container {
    display: flex;
    gap: 10px;
  }
  .post-main-container {
    margin-bottom: 0;
  }
  .overlay-container-edit {
    width: 90%;
  }
  .overlay-container-delete {
    width: 90%;
  }
  .my-posts-main-container {
    padding: 7rem 2rem;
  }
}
</style>
