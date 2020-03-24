import { dep } from '../utils/nextTick';

export const wrapMergeRequest = (
  config,
) => {
  if (config.data.isMerge) {
    let promise = new Promise((resolve, reject) => {
      config.resolve = resolve;
      config.reject = reject;
    });
    dep(config);
    return promise;

  }
}
