<script>
export default {
    data() {
        return {
            numberOfPostsToday: 233, 
            numberOfPostsThisWeek: 2333
        }
    }
}
</script>

<template>
    <div class="number_posts-main-container">
        <div class="day-week-changer">
            <button>TODAY</button>
            <button>THIS WEEK</button>
        </div>
    </div>
  </template>
<style scoped>
.number_posts-main-container {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
}
</style>
