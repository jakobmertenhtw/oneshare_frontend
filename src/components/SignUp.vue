<script>
import { useStore } from 'vuex';

export default {
  name: 'SignUp',
  setup(props, { emit }) {

    const store = useStore();

    const signin = () => {
        emit('update:isSignUp', false);
    }

    const signup = () => {
        // TODO: Implement logic that checks if fields re empty
        store.dispatch('login');
    }

    return {
      signin, 
      signup
    }
  }, 
  emits: ['update:isSignUp']
}


</script>

<template>
    <h1>Sign Up</h1>
    <form>
        <div class="name_fields">
            <input type="text" id="firstname_field" placeholder="Firstname (*)">
            <input type="text" id="lastname_field" placeholder="Lastname (*)">
        </div>
        <input type="email" id="email_field" placeholder="Email adress (*)">
        <input type="text" id="telephone_field" placeholder="Telephone number">
        <input type="password" id="password_field" placeholder="Password (*)">
    </form>
    <div class="send-container">
        <button id="signup-btn" @click="signup">SIGN UP</button>
        <p>Already have an account? <span @click="signin">Sign in</span></p>
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
form div {
    display: flex;
    gap: 1rem;
}
form div input {
    margin-top: 0px;
    flex: 1;
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