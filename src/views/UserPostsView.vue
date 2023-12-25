<script>
export default {
  name: "UserPostsView",
  data() {
    return {
      genrePosts: [
        {
          genreID: 1,
          name: "Hip Hop",
          posts: [
            {
              id: 1,
              title: "Post 1",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nunc nisl ultricies nunc, vitae aliquam nisl nunc eu nisl. Sed vitae nisl eget nisl aliquet ultricies. Sed vitae nisl eget nisl aliquet ultricies.",
              date: "2021-06-01",
              genre: "Hip Hop",
              user: {
                id: 1,
                firstname: "Test",
                lastname: "User",
                description: "Rapper and Producer",
                profileName: "TU",
                profileColor: '#4C83EE'
              },
            },
          ],
        },
      ],
      deleteModal: false, 
      editModal: false, 
      currentPostID: 0, 
    };
  },
  methods: {
    showDeleteModal() {
      this.deleteModal = true;
    },
    showEditModal() {
      this.editModal = true;
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
      window.alert("Post deleted!");
    }, 
    editPost() {
      window.alert("Post edited!");
    }
  }
};
</script>

<template>
  <div class="my-posts-main-container">
    <h1>My Posts</h1>
    <div v-for="(genre, index) in genrePosts" :key="index" class="genrePosts-container">
      <h2>{{ genre.name }}</h2>
      <div v-for="post in genre.posts" :key="post.id" class="post-container-all">
        <div class="post-main-container">
          <div class="post-user-information-container">
            <div class="profile-picture-container">
              <div class="profile-picture-background-container" :style="{backgroundColor: post.user.profileColor}"></div>
              <div class="profile-picture-text" :style="{color: post.user.profileColor}">
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
            <button id="edit-post-btn" @click="showEditModal">
              <img src="../components/icons/edit_icon.svg" alt="Edit Post">
            </button>
          </div>
          <div class="delete-post-container">
            <button id="delete-post-btn" @click="showDeleteModal">
              <img src="../components/icons/delete_icon.svg" alt="Delete Post">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="overlay-background" v-if="deleteModal || editModal" @click="dismissAllModals"></div>
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
    <input type="text" value="This is a test value" id="edit-post-title">
    <textarea name="description-edit-post" id="edit-post-description" cols="30" rows="10">This is a test value textarear</textarea>
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
  background-color: rgba(0,0,0,.7);
  z-index: 10;
  top: 0;
  left: 0;
}
.overlay-container-delete {
  position: absolute;
  z-index: 11;
  background-color: #F4F4F4;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 15px;
}
.overlay-container-delete h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: .5rem;
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
  background-color: #EE4C4C;
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
  background-color: #F4F4F4;
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
  background-color: #4C83EE;
  color: #fff;
}
.edit-buttons-container #cancel-btn-edit {
  background-color: #222;
  color: #fff;
}




.my-posts-main-container {
  padding: 7rem 4rem;
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
}
.post-user-information-container {
  border-right: 1px solid #E5E5E5;
  padding-right: 1rem;
  display: flex;
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
  opacity: .2;
}
.profile-information-container {
  max-width: 8rem;
  margin-left: 1rem;
  max-height: 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.profile-information-container h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: .2rem;
}
.profile-information-container p {
  font-size: .7rem;
  font-weight: 400;
}
.post-content-container {
  padding-left: 1rem;
}
.post-content-container h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: .5rem;
  margin-bottom: 1rem;
}
.post-content-container p {
  font-size: .9rem;
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
  background-color: #4C83EE;
}
#delete-post-btn {
  background-color: #EE4C4C;
}
</style>
