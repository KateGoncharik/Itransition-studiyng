import simpleRestProvider from "ra-data-simple-rest";
import { SERVER_HOST } from "@/requests/params";

const customFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<{
  status: number;
  headers: Headers;
  body: string;
  json: unknown;
}> => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      ["Access-Control-Expose-Headers"]: "Content-Range",
      ["Content-Range"]: "bytes: 0-9/*",
    },
  });

  const body = await response.text();
  let json: unknown = {};

  try {
    json = JSON.parse(body);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return {
    status: response.status,
    headers: response.headers,
    body,
    json,
  };
};

const dataProviderWithAuth = simpleRestProvider(SERVER_HOST, customFetch);

export default dataProviderWithAuth;
