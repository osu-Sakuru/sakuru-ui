///
<reference path="./tooltipPositionerMap.d.ts" />
<script lang="ts" setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  type Point,
  type InteractionAxis,
  type TooltipItem,
  type ChartType,
  type ChartDataset,
  type TooltipModel,
  type TooltipPosition,
  type ActiveElement,
  type InteractionMode,
  type TooltipPositionerMap,
} from 'chart.js';
import { computed } from 'vue';
import { ChartLabels } from './assets/chartLabels';

const props = defineProps({
  datasets: {
    type: Object as () => ChartDataset<'line'>[],
    required: true,
  },
});

const hoverLine = {
  id: 'hoverLine',
  afterDatasetsDraw(chart: ChartJS) {
    const {
      ctx,
      tooltip,
      chartArea: { top, bottom },
      scales: { x },
    } = chart;

    if (tooltip?.active) {
      const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);

      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
      ctx.moveTo(xCoor, top);
      ctx.lineTo(xCoor, bottom);
      ctx.stroke();
      ctx.closePath();
    }
  },
};

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  hoverLine,
);

// Reactivity doesn't work for some reason even with `toRefs`, or `computed`.
// And even `watch` doesn't work.
// Figure out why.
// P.S. This does update `props.datasets` value reactively, but not re-renders the chart.
const chartData = computed(() => ({
  labels: ChartLabels,
  datasets: [...props.datasets],
}));

Tooltip.positioners.sides = function (
  this: TooltipModel<'line'>,
  items: readonly ActiveElement[],
  _eventPosition: Point,
): TooltipPosition | false {
  if (items.length === 0) {
    return false;
  } else {
    const { x } = items[0].element;

    if (x >= 300)
      return {
        x: 0,
        y: 40,
      };
    else
      return {
        x: 600,
        y: 40,
      };
  }
};

const chartOptions = {
  type: 'line',
  scaleShowLabels: false,
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 4,
  },
  scales: {
    x: {
      display: false,
      reverse: true,
    },
    y: {
      display: false,
      reverse: true,
    },
  },
  customCanvasBackgroundColor: '#262626',
  borderWidth: 3,
  borderColor: '#FFFFFF',
  interaction: {
    mode: 'nearest' as InteractionMode,
    axis: 'x' as InteractionAxis,
  },
  pointStyle: 'circle',
  pointRadius: 0,
  pointBackgroundColor: '#262626',
  pointBorderWidth: 4,
  pointBorderColor: '#FFFFFF',
  hitRadius: 100,
  hoverRadius: 8,
  hoverBorderWidth: 3,
  transitions: {
    active: {
      animation: {
        duration: 0,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      padding: 9,
      cornerRadius: 4,
      position: 'sides' as TooltipPositionerMap['sides'],
      caretSize: 0,
      backgroundColor: 'rgb(72, 72, 72)',
      callbacks: {
        label: function (tooltipItems: TooltipItem<ChartType>) {
          return tooltipItems.dataset.label + tooltipItems.formattedValue;
        },
      },
      titleFont: {
        size: 12,
        family: '"Manrope", sans-serif, -apple-system',
        weight: '400',
        lineHeight: '16px',
      },
      titleColor: '#B5B5B5',
      bodyFont: {
        size: 14,
        family: '"Manrope", sans-serif, -apple-system',
        weight: '700',
        lineHeight: '19px',
      },
      bodyColor: '#FFFFFF',
    },
  },
};
</script>

<template>
  <div class="graph-wrapper">
    <Line id="pp-chart" :options="chartOptions" :data="chartData" class="graph">
    </Line>
  </div>
</template>

<style lang="scss" scoped>
.graph-wrapper {
  display: flex;
}

.graph {
  width: 600px;
  height: 80px;
  background-color: transparent;
  color: $main;
}
</style>
