<script>
import DashboardGenresComponent from "@/components/DashboardGenresComponent.vue";
import DashboardPostedTodayComponent from "@/components/DashboardPostedTodayComponent.vue";
import DashboardNumberPostsComponent from "@/components/DashboardNumberPostsComponent.vue";
export default {
  data() {
    return {
      message: "Hello, Vue!"
    };
  },
  methods: {
    changeMessage() {
      this.message = "New Message!";
    }
  }, 
  components: {
    DashboardGenresComponent, 
    DashboardPostedTodayComponent,
    DashboardNumberPostsComponent
  }
}
</script>

<template>
  <div class="dashboard-main-container">
  <div class="your-genres-container">
    <DashboardGenresComponent />
  </div>
  <div class="posted-container">
    <DashboardPostedTodayComponent />
    <DashboardNumberPostsComponent />
  </div>
</div>
</template>


<style scoped>

.dashboard-main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  max-height: 100rem;
  padding: 3rem 1.25rem;
  width: 100%;
  gap: 1rem;
}
.your-genres-container {
  flex: 1;
}
.posted-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
