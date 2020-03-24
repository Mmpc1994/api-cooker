import axios from 'axios';
import { wrapMergeRequest } from '../core/mergeRequest'

const Axios = axios.Axios;

const axiosProto = Axios.prototype;

export const defaultRequest = axiosProto.request.bind(axios.create());

Axios.prototype.request = function (config) {
  console.log(config);
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  if (config.data.isMerge) {
    return wrapMergeRequest(config);
  }
  defaultRequest.apply(this, arguments)
}

export default axios

