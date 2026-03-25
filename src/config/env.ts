const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is missing")
}

const API_PREFIX = import.meta.env.VITE_MODE == "Dev" ? "/v1" : "/api/v1";


export const ENV = {
  BASE_URL,
  AUTH_URL: `${BASE_URL}${API_PREFIX}/auth`,
  SERVER_URL: `${BASE_URL}${API_PREFIX}`,
  UPLOADS: `${BASE_URL}/`,
};

export const COLORS = {
  primary: '#4F39F6',
  primaryLight: '#8B5CF6',
  primaryDark: '#3E2DC4',
  primaryDarker: '#2D1F8C',
  background: {
    light: '#f8fafc',
    lighter: '#f1f5f9',
    white: '#ffffff',
  },
  text: {
    primary: '#1a202c',
    secondary: '#475569',
    muted: '#64748b',
    light: '#94a3b8',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
  },
} as const;

export const SHADOWS = {
  sm: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 8px 25px rgba(0,0,0,0.1)',
  xl: '0 4px 20px rgba(0,0,0,0.08)',
  purple: '0 4px 12px rgba(79, 57, 246, 0.3)',
  purpleHover: '0 6px 16px rgba(79, 57, 246, 0.4)',
} as const;

