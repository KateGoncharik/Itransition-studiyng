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
  const method = options.method || "GET";
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ["Access-Control-Expose-Headers"]: "Content-Range",
    ["Content-Range"]: "bytes: 0-9/*",
  };

  const body = method !== "GET" && options.body ? options.body : undefined;

  const response = await fetch(url, {
    ...options,
    method,
    credentials: "include",
    headers,
    body,
  });
  if (response.status === 500) {
    console.error("Error:", response);
  }

  const responseBody = await response.text();
  let json: unknown = {};

  try {
    json = JSON.parse(responseBody);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  return {
    status: response.status,
    headers: response.headers,
    body: responseBody,
    json,
  };
};

const dataProviderWithAuth = simpleRestProvider(SERVER_HOST, customFetch);

export default dataProviderWithAuth;
