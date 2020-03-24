import { isNative } from './env';
import { defaultRequest } from '../http';

export let EVENT_QUENE = [];
let pending = false;

function flushRequest() {
  pending = false;
  const copies = EVENT_QUENE.splice(0);
  EVENT_QUENE.length = 0;
  console.log(EVENT_QUENE);
  defaultRequest({
    url: '/api-cooker',
    method: 'post',
    data: copies
  })
}

export function dep(config) {
  EVENT_QUENE.push(config);
  nextTick();
}


let timeFunc

if (typeof (Promise) !== undefined && isNative(Promise)) {
  timeFunc = () => {
    Promise.resolve().then(flushRequest)
  }
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timeFunc = () => {
    setImmediate(flushRequest)
  }
} else {
  timeFunc = () => {
    setTimeout(flushRequest, 0)
  }
}

export function nextTick() {
  if (!pending) {
    pending = true;
    timeFunc()
  }
}
