<template>
  <section class="player">
    <div class="player__header">
      <h1>Player: {{ playerDetails.first_name }} {{ playerDetails.last_name }}</h1>
      <router-link class="button" :to="'/'">back to all players</router-link>
    </div>
    <div class="player__container">
      <loader v-if="requestStatus" />
      <template v-else>
        <div class="player__dashboard">
          <div class="player__dashboard-person">
            <dashboard-container :title="'Bio'">
              <player-details :details="playerDetails"/>
            </dashboard-container>
            <dashboard-container :title="'Team'">
              <player-details :details="teamDetails" />
            </dashboard-container>
          </div>
          <div class="player__dashboard-stats">
            <select class="player__dashboard-stats__select" v-model="selected">
              <option
                v-for="option in options"
                :value="option.value"
                :key="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <dashboard-container :title="getSelectedDropdownValue">
              <bar-chart :categories="getSeasons(stats)" :series="getSeries(stats)" />
            </dashboard-container>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import BarChart from '@/components/charts/BarChart.vue';
import Loader from '@/components/ui/Loader.vue';
import PlayerDetails from '@/components/player/PlayerDetails.vue';
import DashboardContainer from '@/components/ui/DashboardContainer.vue';
import { DropdownProperties } from '../enums/dropdownProperties';
import { Player } from '../types/player.model';
export default Vue.extend({
  name: 'Player',
  data() {
    return {
      requestStatus: false,
      playerDetails: {},
      teamDetails: {},
      title: '',
      stats: Array<any>(),
      selected: 'PLAYED_GAMES',
      options: Array<any>(),
    }
  },
  components: {
    BarChart,
    PlayerDetails,
    Loader,
    DashboardContainer,
  },
  watch: {
    selected(value: string): void {
      this.getStatisticsForGivenSeason(this.$route.params.id, value.toLowerCase());
    },
  },
  computed: {
    getDropdownOptions(): any {
      return Object.keys(DropdownProperties).map((key: any): any => this.options.push({ text: DropdownProperties[key], value: key }));
    },
    getSelectedDropdownValue(): string {
      return this.options.find(elem => elem.value === this.selected)['text'];
    },
  },
  methods: {
    async getStatisticsForGivenSeason(id: string, property: string) {
      this.stats = [];
      const seasonRange = [2015, 2016, 2017, 2018, 2019, 2020];
      seasonRange.map((s) => {
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${s}&player_ids[]=${id}`)
          .then((res) => {
            const dataResponse = res.data.data;
            this.stats.push({
              season: s,
              stats: dataResponse.length ? dataResponse[0][property] : 0,
            });
            this.sortData(this.stats);
          }).catch((e) => {
            console.error(e);
            this.stats = [];
          });
      });
    },
    toggleRequestStatus(): void {
      this.requestStatus = !this.requestStatus;
    },
    getPlayerInfos(id: string) {
      axios.get(`https://www.balldontlie.io/api/v1/players/${id}`)
        .then(response => {
          const { data }: { data: Player } = response;
          const { team, ...details } = data;
          this.teamDetails = team;
          this.playerDetails = details;
        }).catch((e) => {
          console.error(e);
          this.stats = [];
        });
    },
    sortData(stats: any): any {
      return stats.sort((a: any, b: any) => a.season - b.season);
    },
    getSeasons(stats: any): String[] {
      return stats.map((season: any): any => season.season);
    },
    getSeries(stats: any): String[] {
      return stats.map((season: any): any => season.stats);
    },
   },
  created() {
    this.toggleRequestStatus();
    this.getDropdownOptions;
    const { id } = this.$route.params;
    this.getPlayerInfos(id);
    this.getStatisticsForGivenSeason(id, 'games_played');
    this.toggleRequestStatus();
  },
});
</script>
<style lang="scss" scoped>
.player {
  width: 100%;

  @include desktop {
    width: auto;
  }

  &__header {
    margin-bottom: 20px;
  }

  &__dashboard {
    @include flex-column;
    align-items: stretch;

    @include desktop {
      @include flex-row-wrap(nowrap);
      align-items: flex-end;
      justify-content: space-evenly;
    }

    &-person {
      @include flex-column;

      @include mobile {
        @include flex-row-wrap(nowrap);
      }

      @include desktop {
        @include flex-column;
      }
    }

    &-stats {
      &__select {
        margin: 0 0 20px;

        @include tablet {
          margin: 0 0 0 20px;
        }
      }
    }
  }
}
</style>
