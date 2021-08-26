<template>
  <div class="bar-chart">
    <v-chart ref="bar" class="bar-chart__details" :option="getOptions" autoresize />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TooltipComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  GridComponent,
]);

export default Vue.extend({
  name: "BarChart",
  props: {
    categories: {
      type: Array as PropType<Number[]>,
      required: true,
    },
    series: {
      type: Array as PropType<Number[]>,
      required: true,
    },
  },
  components: {
    VChart,
  },
  computed: {
    getOptions(): any {
      const options = {
        xAxis: {
          type: 'category',
          data: this.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.series,
            seriesName: '',
            type: 'bar',
            itemStyle: {
              color: '#faa91e',
            },
          }
        ],
        tooltip: {
          trigger: "axis",
          formatter: "{b}: {c}",
        },
      }
      return options;
    }
  },
});
</script>
<style lang="scss" scoped>
.bar-chart {
  overflow-x: scroll;

  &__details {
    min-height: 300px;
    min-width: 300px;

    @include tablet {
      min-height: 500px;
      min-width: 500px;
    }
  }
}
</style>