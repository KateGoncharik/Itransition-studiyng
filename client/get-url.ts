import { SERVER_HOST } from "./params.js";
export function getUrl(path: string) {
  return `${SERVER_HOST}/${path}`;
}
