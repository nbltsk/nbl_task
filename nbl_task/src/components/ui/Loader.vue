<template>
  <div class="loader">
    <div class="loader__item"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Loader',
});
</script>
<style lang="scss">
.loader {
  position: absolute;
  top: 50%;
  left: 50%;

  &__item {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: $color_orange;
    color: $color_orange;
    animation: dotLoader 1s infinite linear alternate;
    animation-delay: .25s;

    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: $color_orange;
      color: $color_orange;
      animation: dotLoader 1s infinite alternate;
    }

    &::before {
      left: -15px;
      animation-delay: 0s;
    }

    &::after {
      left: 15px;
      animation-delay: .5s;
    }
  }
}

@keyframes dotLoader {
  0% {
    background-color: $color_white;
  }
  50%,
  100% {
    background-color: $color_orange;
  }
}
</style>
