import { SERVER_HOST } from './params.js';
export function getUrl(path) {
  return `${SERVER_HOST}/${path}`;
}
