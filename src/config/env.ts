const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://backend.tiiron.com";

if(!BASE_URL){
    throw new Error("VITE_API_BASE_URL is missing")
}

const API_PREFIX = import.meta.env.VITE_MODE == "Dev" ? "/v1" : "/api/v1";


export const ENV = {
  BASE_URL,
  AUTH_URL: `${BASE_URL}${API_PREFIX}/auth`,
  SERVER_URL: `${BASE_URL}${API_PREFIX}`,
  UPLOADS: `${BASE_URL}/`,
};

  