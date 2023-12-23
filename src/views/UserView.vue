
<script>
import UserMenu from '../components/UserMenu.vue';

export default {
    name: "UserView",
    components: { UserMenu }
}
</script>

<template>
  <div class="user-view">
    <UserMenu />
    <div class="router-container">
    <router-view />
  </div>
  </div>
</template>


<style scoped>
.user-view {
    display: flex;
    height: 100vh;
    max-width: 100vw;
}
.router-container {
    flex: 1;
    overflow-x: auto;
}
</style>
