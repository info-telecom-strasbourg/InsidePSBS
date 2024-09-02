import type { DefaultImagesData } from "@/schemas/settings/default-images.schema";

export const storeDefaultImage = async ({
  image,
  token,
}: {
  image: DefaultImagesData["data"][0];
  token: string | null;
}) => {
  const url = `${process.env.EXPO_PUBLIC_API_URL}/api/avatar/default`;
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        default_link: image.path,
        default_name: image.name,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res, null, 2));

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
