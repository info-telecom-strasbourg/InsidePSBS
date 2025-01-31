export const logError = async (
  res: Response,
  { location }: { location?: string }
) => {
  // eslint-disable-next-line no-console
  console.error(
    `Error ${res.status} ${location && `from ${location} `}: ${
      res.statusText || "Unexpected error."
    }`
  );
};
