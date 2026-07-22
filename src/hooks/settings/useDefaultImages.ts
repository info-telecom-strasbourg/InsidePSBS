import { useFetch } from "@/hooks/useFetch";
import {
    DefaultImagesSchema,
    type DefaultImagesData,
} from "@/schemas/settings/default-images.schema";

export const useDefaultImages = () => {
  return useFetch<DefaultImagesData>({
    apiEndpoint: "user/default",
    schema: DefaultImagesSchema,
    queryKey: ["default-images"],
  });
};