// Application constants

export const API_ENDPOINTS = {
  USERS: "https://jsonplaceholder.typicode.com/users",
} as const;

export const ROUTES = {
  HOME: "/",
  USER_DETAILS: "/user/:id",
  ADD_USER: "/add-user",
  EDIT_USER: "/edit-user/:id",
} as const;

export const STORAGE_KEYS = {
  USERS: "users",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[\d\s\-+()]+$/,
    MIN_LENGTH: 10,
  },
  WEBSITE: {
    PATTERN: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
  },
  ADDRESS: {
    STREET_MIN_LENGTH: 3,
    CITY_MIN_LENGTH: 2,
    ZIPCODE_PATTERN: /^\d{5}(-\d{4})?$/,
  },
  COMPANY: {
    NAME_MIN_LENGTH: 2,
    CATCH_PHRASE_MIN_LENGTH: 5,
    BS_MIN_LENGTH: 5,
  },
} as const;

export const NOTIFICATION_DURATION = {
  SUCCESS: 3000,
  ERROR: 5000,
  WARNING: 4000,
  INFO: 3000,
} as const;

export const SORT_OPTIONS = {
  NAME: "name",
  EMAIL: "email",
  COMPANY: "company",
} as const;

export const SORT_ORDERS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const THEME_COLORS = {
  PRIMARY: "#3b82f6",
  SECONDARY: "#6b7280",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#3b82f6",
} as const;

export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
  "2XL": "1536px",
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
