import _ from 'lodash';
import type Plausible from 'plausible-tracker';
import { inject } from 'vue';

export { createTrackerService, useTracker };

function createTrackerService({ plausible }: { plausible: ReturnType<typeof Plausible> | undefined }) {
  return {
    trackEvent({ eventName }: { eventName: string }) {
      if (plausible) {
        plausible.trackEvent(eventName);
      }
    },
  };
}

function useTracker() {
  const plausible: ReturnType<typeof Plausible> | undefined = inject('plausible');

  // 在 Electron 环境中，plausible 可能未初始化，不报错
  const tracker = createTrackerService({ plausible });

  return {
    tracker,
  };
}
