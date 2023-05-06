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
  type InteractionAxis,
  type InteractionMode,
  type TooltipItem,
  type ChartType,
  type ChartDataset,
} from 'chart.js';
import { computed } from 'vue';

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
  labels: [
    '1 Days ago',
    '2 Days ago',
    '3 Days ago',
    '4 Days ago',
    '5 Days ago',
    '6 Days ago',
    '7 Days ago',
    '8 Days ago',
    '9 Days ago',
    '10 Days ago',
    '11 Days ago',
    '12 Days ago',
    '13 Days ago',
    '14 Days ago',
    '15 Days ago',
    '16 Days ago',
    '17 Days ago',
    '18 Days ago',
    '19 Days ago',
    '20 Days ago',
    '21 Days ago',
    '22 Days ago',
    '23 Days ago',
    '24 Days ago',
    '25 Days ago',
    '26 Days ago',
    '27 Days ago',
    '28 Days ago',
    '29 Days ago',
    '30 Days ago',
    '31 Days ago',
    '32 Days ago',
    '33 Days ago',
    '34 Days ago',
    '35 Days ago',
    '36 Days ago',
    '37 Days ago',
    '38 Days ago',
    '39 Days ago',
    '40 Days ago',
    '41 Days ago',
    '42 Days ago',
    '43 Days ago',
    '44 Days ago',
    '45 Days ago',
    '46 Days ago',
    '47 Days ago',
    '48 Days ago',
    '49 Days ago',
    '50 Days ago',
    '51 Days ago',
    '52 Days ago',
    '53 Days ago',
    '54 Days ago',
    '55 Days ago',
    '56 Days ago',
    '57 Days ago',
    '58 Days ago',
    '59 Days ago',
    '60 Days ago',
  ].reverse(),
  datasets: [...props.datasets],
}));

const chartOptions = {
  type: 'line',
  scaleShowLabels: false,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  customCanvasBackgroundColor: '#262626',
  borderWidth: 4,
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
  padding: 10,
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
