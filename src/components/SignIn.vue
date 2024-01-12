<script>

import { useStore } from "vuex";
import { ref } from "vue";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: 'SignIn',
  setup(props, {emit}) {
    const signup = () => {
      emit('update:isSignUp', true);
    }

    const store = useStore();
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);

    const signin = () => {

      if (email.value === '' || password.value === '') {
        window.alert('Please fill out all required fields!');
        return;
      }

      isLoading.value = true;

      const endpoint = 'http://localhost:8080/users/mail';

      const requestedOptions = {
        method: 'GET', 
        redirect: 'follow'
      }


      fetch(endpoint + '/' + email.value + '/' + password.value, requestedOptions)
        .then(response => response.json())
        .then(result => {
          if (result.status === 500) {
            window.alert(result.message);
            isLoading.value = false;
            return;
          }
          isLoading.value = false;
          store.dispatch('login', result.userID);
        })
        .catch(error => {
          isLoading.value = false;
          window.alert('Something went wrong in the connection! This is the error message: ' + error);
        });
    }

    return {
      signup, signin, 
      email, password, 
      isLoading
    }
  }, 
  emits: ['update:isSignUp'], 
  components: {
    LoadingComponent
  }
}

</script>

<template>
  <h1>Sign In</h1>
  <form>
    <input type="email" id="email_field" v-model="email" placeholder="Email adress (*)">
    <input type="password" id="password_field" v-model="password" placeholder="Password (*)">
  </form>
  <div class="send-container">
    <button id="signup-btn" @click="signin">
      <span v-if="!isLoading">SIGN IN</span>
      <LoadingComponent size="small" color="#fff" v-if="isLoading" />
    </button>
    <p>Don't have an account? <span @click="signup">Sign up</span></p>
  </div>
</template>
  

<style scoped>
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2rem;
    font-weight: 600;
}
form {
    margin-top: 20px;
    display: grid;
    grid-template: 1fr;
}
form input {
    padding: 12px 20px;
    outline: none;
    border-radius: 5px;
    background-color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    margin-top: 10px;
    border: none;
    padding-right: 10px;
    padding-left: 10px;
}
.send-container {
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.send-container p {
    font-family: 'Montserrat', sans-serif;
    font-size: .8rem;
    margin-top: 0px;
}
.send-container p span {
    color: #8201FF;
    margin-left: 10px;
}
.send-container p span:hover {
    cursor: pointer;
}
#signup-btn {
    width: fit-content;
    background-color: #000;
    color: white;
    border: none;
}
</style>