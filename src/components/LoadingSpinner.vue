
<template>
  <font-awesome-icon
    v-bind:style="{ opacity: spin ? 1 : 0 }"
    icon="fa-solid fa-rotate"
    class="load-spinner fa-spin"
  />
</template>

<script>
export default {
  props: {
    spin: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.load-spinner {
  transition-property: opacity;
  transition-duration: 400ms;
  position: fixed;  
  top: 15px;      
  left: 15px;
  font-size: 1.5rem; 
  color: #6b5b4e;    
}
</style>