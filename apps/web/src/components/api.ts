const buildBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

export const getApiHeaders = () => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  if (process.env.AUTH_API_KEY) {
    headers.set("Authorization", `Bearer ${process.env.AUTH_API_KEY}`);
  }

  return headers;
};

export const apiFetch = async (path: string) => {
  const baseUrl = buildBaseUrl();
  return fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: getApiHeaders()
  });
};
