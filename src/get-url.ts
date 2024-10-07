import { SERVER_HOST } from "./params";
export function getUrl(path: string): string {
  return `${SERVER_HOST}/${path}`;
}
