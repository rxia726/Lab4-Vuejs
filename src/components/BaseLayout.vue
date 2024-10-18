<template>
  <div>
    <!-- Base Header with user data and event listener -->
    <base-header :user="user" @userChanged="$emit('userChanged', $event)" />
    
    <!-- The slot will render any child content passed from App.vue -->
    <slot :user="user" />
  
    <!-- Base Footer -->
    <base-footer />
  </div>
</template>

<script>
// Importing BaseHeader and BaseFooter components
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'

export default {
  name: 'BaseLayout',
  props: {
    user: { type: Object, default: null }  // Receive user data from parent
  },
  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style scoped>
/* Add styling specific to your layout */
</style>
