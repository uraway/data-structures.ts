import { PerformanceObserver, performance } from 'perf_hooks';

export const measure = (fn: () => void, loop = 100): Promise<unknown> => {
  return new Promise((resolve) => {
    const obs = new PerformanceObserver((items) => {
      const durations = [];
      for (const perf of items.getEntriesByType('function')) {
        durations.push(perf.duration);
      }
      const average = durations.reduce((a, b) => a + b, 0) / durations.length; // 平均値の計算
      obs.disconnect();
      resolve(average);
    });
    obs.observe({ entryTypes: ['function'], buffered: true });
    const f = performance.timerify(fn);

    for (let i = 0; i < loop; i++) {
      f();
    }
  });
};
