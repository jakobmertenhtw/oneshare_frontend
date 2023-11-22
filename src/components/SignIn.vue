<script>
export default {
  name: 'SignIn',
  setup() {
    const signup = () => {
      window.alert("test - TODO: Implement signup");
    }
    return {
      signup
    }
  }
}

</script>

<template>
  <h1>Sign In</h1>
  <form>
    <input type="email" id="email_field" placeholder="Email adress (*)">
    <input type="password" id="password_field" placeholder="Password (*)">
  </form>
  <div class="send-container">
    <button id="signup-btn">SIGN IN</button>
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