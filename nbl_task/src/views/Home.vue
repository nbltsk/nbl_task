<template>
  <section class="players">
    <h1>All NBA Players</h1>
    <div class="players__container">
      <div class="players__content">
        <loader v-if="requestStatus" />
        <player-list v-else :players="playersList" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Loader from '@/components/ui/Loader.vue';
import PlayerList from '@/components/player/PlayerList.vue';
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      requestStatus: false,
      playersList: [],
      metaDetails: [],
    }
  },
  components: {
    Loader,
    PlayerList,
  },
  methods: {
    toggleRequestStatus(): void {
      this.requestStatus = !this.requestStatus;
    },
  },
  created() {
    console.log('created home');
    this.toggleRequestStatus();
    axios.get("https://www.balldontlie.io/api/v1/players")
    .then(response => {
      const { data: { data: players, meta } } = response;
      this.playersList = players;
      this.metaDetails = meta;
      this.toggleRequestStatus();
      console.log('players:', players, 'meta:', meta);
    });
  },
});
</script>
<style lang="scss" scoped>
.players {
  &__container {
    margin: 0 0 50px;
    max-width: 100%;

    @include tablet {
      max-width: 1000px;
    }
  }

  &__content {
    min-height: 300px;
    position: relative;

    @include tablet {
      min-height: 370px;
    }
  }
}
</style>
