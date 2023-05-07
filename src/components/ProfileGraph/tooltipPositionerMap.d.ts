import * as _ChartJS from 'chart.js';

declare module 'chart.js' {
  interface TooltipPositionerMap {
    sides: TooltipPositionerFunction<'line'>;
  }
}
