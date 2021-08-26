<template>
  <ul class="player-list">
    <li v-for="(player, index) in players" :key="`player-${index}`" class="player-list__one">
      <router-link class="player-list__link" :to="{ name: 'player', params: { id: player.id }
      }">
        {{ player.first_name }} {{ player.last_name }}
      </router-link>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue';
import { Player } from '../../types/player.model';
export default Vue.extend({
  name: 'PlayerList',
  props: {
    players: {
      type: Array as PropType<Player[]>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.player-list {
  @include flex-row-wrap(wrap);

  &__one {
    margin: 4px;
  }

  &__link {
    border: 1px solid $color_black;
    padding: 4px;
    border-radius: 8px;
    color: $color_black;
    display: inline-block;
    min-width: 4vw;
    text-align: center;

    @include tablet {
      padding: 12px;
      min-width: 200px;
      max-width: 200px;
    }

    @include mobile {
      padding: 8px;
    }

    &:hover {
      border-width: 2px;
      margin: -1px;
    }
  }
}
</style>