<script>
export default {
  setup(props, {emit}) {
    const openModal = () => {
      emit("openModal");
    }
    return {
      openModal
    }
  }

}
</script>
<template>
  <header>
    <div class="sign_btns">
      <button id="signin_btn" @click="openModal">SIGN UP</button>
      <button id="signup_btn" @click="openModal">SIGN IN</button>
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
