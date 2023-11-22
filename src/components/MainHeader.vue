<script>
export default {
  setup(props, {emit}) {
    const openModal_SIGNIN = () => {
      emit("openModal_SIGNIN");
    }
    const openModal_SIGNUP = () => {
      emit("openModal_SIGNUP");
    }
    return {
      openModal_SIGNIN, 
      openModal_SIGNUP
    }
  }

}
</script>
<template>
  <header>
    <div class="sign_btns">
      <button id="signin_btn" @click="openModal_SIGNUP">SIGN UP</button>
      <button id="signup_btn" @click="openModal_SIGNIN">SIGN IN</button>
    </div>
  </header>
</template>


<style scoped>
header {
  width: 90vw;
  margin: 0 auto;
  margin-top: 3rem;
  display: flex;
}
.sign_btns {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
#signup_btn {
  margin-left: 10px;
  border: none;
  background-image: linear-gradient(to right, #5200FF , #9E00FF);
  color: white;
}
#signin_btn {
  border: 2px solid #000;
  color: #000;
}
</style>
