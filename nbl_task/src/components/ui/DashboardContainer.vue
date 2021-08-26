<template>
  <div class="dashboard-container">
    <p v-if="title" class="dashboard-container__title">{{ title | capitalize }}</p>
    <div class="dashboard-container__content">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import filters from '../../mixins/filters';
export default Vue.extend({
  name: 'DashboardContainer',
  mixins: [filters],
  props: {
    title: {
      type: String,
    }
  },
});
</script>
<style lang="scss" scoped>
.dashboard-container {
  @include flex-column;
  border: 2px solid $color_black;
  border-radius: 4px;
  align-items: flex-start;
  width: 100%;
  margin: 0 0 20px;
  overflow: hidden;

  @include tablet {
    margin: 20px;
  }

  &__title {
    background-color: $color_black;
    text-transform: uppercase;
    text-align: center;
    color: $color_white;
    font-weight: 700;
    width: 100%;
  }

  &__content {
    padding: 20px;
    min-width: 224px;
    position: relative;
    width: 100%;
  }
}
</style>