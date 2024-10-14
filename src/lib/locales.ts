export const locales = ["ky", "ru"] as const;
export type Locale = (typeof locales)[number];
