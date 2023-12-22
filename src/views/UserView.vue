
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
    <router-view />
  </div>
</template>


<style scoped>
.user-view {
    display: flex;
    height: 100vh;
}
</style>
