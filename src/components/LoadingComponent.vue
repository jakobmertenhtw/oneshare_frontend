<script>
export default {
  name: "LoadingComponent",
  props: {
    size: {
      type: String,
      default: "medium",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<template>

  <div class="loading-container" :style="`--color: ${color}`">
    <span></span>
  </div>
</template>

<style scoped>
.loading-container span {
    display: block;
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-right-color: var(--color, #fff);
  animation: spinner-anim 0.8s linear infinite;
}

@keyframes spinner-anim {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
