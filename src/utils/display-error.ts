export const displayError = async (
  res: Response,
  { location }: { location?: string }
) => {
  console.error(
    `Error ${res.status} ${location && `from ${location}`}: ${
      res.statusText || "Unexpected error."
    }`
  );
};
