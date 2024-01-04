<script>
import LoadingComponent from "./LoadingComponent.vue";
export default {
  name: "PostComponent",
  props: {
    post_prop: Object,
  },
  data() {
    return {
      post: this.post_prop,
      userInput: "",
      messageLoading: false,
      likeLoading: false
    };
  },
  mounted() {
    console.log(this.post);
  },
  methods: {
    sendMessage() {

      if (!this.$store.getters.isLoggedIn) {
        window.alert("You need to be logged in to send a message!");
        return;
      }

      let message = {
        userID: this.post.userID,
        postID: this.post.postID,
        text: this.userInput,
        datum: new Date(),
        userFullName: this.post.user.firstName + " " + this.post.user.lastName, 
        userColor: this.post.user.profileColor,
      };

      const baseURL = "http://localhost:8080/";

      const endpoint = baseURL + 'message';
      const requestedOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      }

      this.messageLoading = true;

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then((data) => {
          window.alert("Message sent successully!");
          console.log(data);
          this.userInput = "";
          this.messageLoading = false;
        }).catch((error) => {
          window.alert("Something went wrong! Please try again later!");
          console.log(error);
          this.messageLoading = false;
        });




    },
    likePost() {
      this.likeLoading = true;

      const baseURL = "http://localhost:8080/";
      let endpoint = baseURL + 'likePost/' + this.post.postID;

      const requestedOptions = {
        method: 'PUT',
        redirect : 'follow',
      }

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then((data) => {
          this.post.likes = data.likes;
          this.likeLoading = false;
        }).catch((error) => {
          window.alert("Something went wrong! Please try again later!");
          console.log(error);
          this.likeLoading = false;
        });

    }
  },
  computed: {
    buttonOpacity() {
      return this.userInput ? 1 : 0.2;
    },
    hoverClass() {
      return this.userInput ? "hover-effect" : "";
    },
  },
  components: {
    LoadingComponent,
  },
};
</script>

<template>
  <div class="main-container_post">
    <div class="post-container">
      <div class="user-info_container">
        <div class="user_information">
          <div class="profile_picture">
            <div class="profile-picture-background" :style="{backgroundColor: '#' + this.post.user.profileColor}"></div>
            <p id="profilePictureText" :style="{color: '#' + this.post.user.profileColor}">{{ this.post.user.profilePicture }}</p>
          </div>
          <div class="profile-info-text">
            <h4>{{ this.post.user.firstName + " " + this.post.user.lastName }}</h4>
            <p>{{ this.post.user.mail }}</p>
          </div>
        </div>
        <div class="likes-container">
          <div class="like_button-container">
            <button id="like-btn" @click="likePost">
              <img src="./icons/heart_icon.svg" alt="Like Post" v-if="!likeLoading" />
              <LoadingComponent size="small" color="#fff" v-if ="likeLoading" />
            </button>
          </div>
          <p>{{ post.likes }} likes</p>
        </div>
      </div>
      <div class="post-main-container">
        <h2 id="post-heading">{{ post.titel }}</h2>
        <p id="post-text">{{ post.text }}</p>
        <div class="see_more-container">
          <button>
            <img src="./icons/see_more_icon.svg" alt="See More"/>
          </button>
        </div>
      </div>
    </div>
    <div class="message-container">
      <div class="overlay-message-loading" v-if="messageLoading">
        <LoadingComponent size="small" color="#fff" />
      </div>
      <textarea
        v-model="userInput"
        name="message_{{ this.post.postID }}"
        id="message_{{ this.post.postID }}"
        placeholder="Write a message"
      ></textarea>
      <button
        id="send_message-btn"
        :class="{
          'opacity-full': userInput,
          'opacity-half': !userInput,
          'hover-effect': userInput,
        }"
        @click="sendMessage"
        :disabled="!userInput"
      >
        SEND MESSAGE
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-container_post {
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
}
.post-container {
  background-color: #fff;
  flex: 1;
  border-radius: 15px;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
}
.user-info_container {
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  border-right: 0.75px solid #444;
  padding-top: 10px;
  padding-bottom: 10px;
}
.user_information {
  display: flex;
  gap: 10px;
}

.profile_picture {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.profile-picture-background {
  width: 100%;
  height: 100%;
  opacity: .4;
}
#profilePictureText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


.profile-info-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user_information h4 {
  font-size: 1rem;
  font-weight: 700;
}
.user_information p {
  font-size: 0.8rem;
  font-weight: 400;
}
.likes-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.likes-container button {
  border: none;
  outline: none;
  padding: 7px 10px;
  border-radius: 8px;
  background-color: #000;
}
.likes-container p {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.8rem;
}

.post-main-container {
  flex: 1;
  position: relative;
}
#post-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: .5rem;
}
#post-text {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-top: 1rem;
    padding-bottom: 1.5rem;
}

.see_more-container {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: -10px -20px;
  border-radius: 8px;
}
.see_more-container button {
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
}
.see_more-container button:hover img {
    opacity: 0.5 ;
}

.message-container {
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.overlay-message-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
}
.message-container textarea {
  width: 100%;
  min-width: 20rem;
  height: 100%;
  min-height: 10rem;
  border: none;
  outline: none;
  resize: none;
  padding: 1rem;
  border-radius: 10px;
  line-height: 1.3rem;
}
.message-container button {
  margin: auto;
  width: 90%;
  margin-top: 7px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
}

.opacity-full {
  opacity: 1;
}
.opacity-half {
  opacity: 0.2;
}
.hover-effect:hover {
  opacity: 0.8;
}
</style>
