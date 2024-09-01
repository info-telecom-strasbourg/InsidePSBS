export const displayError = async (
  res: Response,
  {
    location,
    message = "Unexpected Error",
  }: { location?: string; message: string }
) => {
  console.error(
    `Error ${res.status} ${location && `from ${location}`}: ${message}`
  );
};
