<template>
  <section class="players">
    <div class="players__header">
      <h1>All NBA Players</h1>
      <p class="players__header-description">Click below to explore player's statistics.</p>
    </div>
    <div class="players__container">
      <div class="players__content">
        <loader v-if="requestStatus" />
        <player-list v-else :players="playersList" />
      </div>
      <div v-if="playersList && playersList.length" class="players__pagination">
        <pagination
          v-model="page"
          :records="metaDetails.total_count"
          :per-page="25"
          :options="options"
          @paginate="myCallback"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Pagination from 'vue-pagination-2';
import Loader from '@/components/ui/Loader.vue';
import PlayerList from '@/components/player/PlayerList.vue';
export default Vue.extend({
  name: 'Home',
  data() {
    return {
      requestStatus: false,
      playersList: [],
      metaDetails: [],
      page: 1,
      options: {
        chunk: 5,
        chunksNavigation: 'scroll',
        edgeNavigation: true,
        texts: {
          first: 'First',
          last: 'Last'
        },
      },
    }
  },
  components: {
    Pagination,
    Loader,
    PlayerList,
  },
  methods: {
    myCallback(): void {
      this.toggleRequestStatus();
      axios.get(`https://www.balldontlie.io/api/v1/players?page=${this.page}`)
      .then(response => {
        const { data: { data: players, meta } } = response;
        this.playersList = players;
        this.metaDetails = meta;
        this.toggleRequestStatus();
      }).catch((e) => {
        console.error(e);
        this.playersList = [];
        this.metaDetails = [];
      });
    },
    toggleRequestStatus(): void {
      this.requestStatus = !this.requestStatus;
    },
  },
  created() {
    this.toggleRequestStatus();
    axios.get("https://www.balldontlie.io/api/v1/players")
    .then(response => {
      const { data: { data: players, meta } } = response;
      this.playersList = players;
      this.metaDetails = meta;
      this.toggleRequestStatus();
    }).catch((e) => {
      console.error(e);
      this.playersList = [];
      this.metaDetails = [];
    });
  },
});
</script>
<style lang="scss" scoped>
.players {
  &__header {
    &-description {
      font-size: 20px;
      line-height: 28px;
      margin: 20px 0;
    }
  }

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

  &__pagination {
    @include flex-row-wrap(nowrap);
    margin: 30px 0;
  }

  ::v-deep {
    .VuePagination {
    
      &__pagination {
        @include flex-row-wrap(nowrap);
        &-item {
          padding: 3px 6px;
          margin: 0;

          @include mobile {
            margin: 20px;
          }

          &.active {
            font-weight: 700;
            background-color: $color_orange;
            border-radius: 4px;
          }
        }
      }

      &__count {
        text-align: center;
      }
    }
  }
}
</style>
