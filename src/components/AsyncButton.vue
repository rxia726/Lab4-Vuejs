<template>
    <base-button
      :disabled="isPending"
      :color="color"
      @click.stop.prevent="handleClick"
    >
      <!-- Replace FontAwesome with text or spinner if not installed -->
      <span v-if="isPending">Loading...</span>
      <slot v-else />
    </base-button>
  </template>
  
  <script>
  import BaseButton from './BaseButton.vue';
  
  export default {
    name: 'AsyncButton',
    components: { BaseButton },
    inheritAttrs: false, // Avoid passing unnecessary attributes
    props: {
      color: {
        type: String,
        default: 'primary'
      }
    },
    data() {
      return {
        isPending: false
      };
    },
    methods: {
      async handleClick() {
        const originalOnClick = this.$attrs.onClick;
        if (originalOnClick) {
          this.isPending = true; // Set loading state
          try {
            // Wait for the original onClick function to resolve
            await originalOnClick();
          } finally {
            this.isPending = false; // Reset loading state
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling for the AsyncButton if needed */
  </style>
  