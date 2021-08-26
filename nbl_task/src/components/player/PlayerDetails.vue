<template>
  <div class="player-details">
    <ul class="player-details__list">
      <li
        v-for="(value, name) in details"
        :key="`value-${name}`"
        class="player-details__one"
      >
        <span>{{ name | capitalize }}: {{ value }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import filters from '../../mixins/filters';
import { Player } from "../../types/player.model";
export default Vue.extend({
  name: 'PlayerDetails',
  mixins: [filters],
  props: {
    details: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
});
</script>
<style lang="scss">
.player-details {
  display: inline-block;

  &__list {
    display: inline-flex;
    flex-direction: column;
  }

  &__one {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.2px;
  }
}
</style>