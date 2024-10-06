import { SERVER_HOST } from "./params.ts";
export function getUrl(path: string) {
  return `${SERVER_HOST}/${path}`;
}
