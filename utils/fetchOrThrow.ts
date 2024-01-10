export const fetchOrThrow = async (
  url: string | URL | Request,
  options?: RequestInit,
) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw response;
  }
  return response;
};
