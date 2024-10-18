<template>
  <button 
    :class="['base-button', colorClass, { disabled: isDisabled }]" 
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'warn', 'danger'].includes(value); // Validates the color prop
      }
    }
  },
  computed: {
    colorClass() {
      // Dynamically return the class based on the color prop
      return `base-button--${this.color}`;
    }
  },
  methods: {
    handleClick(event) {
      if (!this.isDisabled) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.base-button--primary {
  background-color: #42b983;
  color: white;
}

.base-button--primary:hover {
  background-color: #38a169;
}

.base-button--warn {
  background-color: #f39c12;
  color: white;
}

.base-button--warn:hover {
  background-color: #e67e22;
}

.base-button--danger {
  background-color: #e74c3c;
  color: white;
}

.base-button--danger:hover {
  background-color: #c0392b;
}

.base-button.disabled {
  background-color: #b0b0b0;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
