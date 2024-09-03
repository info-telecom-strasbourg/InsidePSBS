import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { RefreshView } from "@/components/page/refresh-view";
import { Button } from "@/components/primitives/button";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { DefaultImagePickerModal } from "@/features/settings/default-image-picker";
import { useMe } from "@/queries/profile/me.query";
import { useDefaultImages } from "@/queries/settings/default-images.query";
import { storeDefaultImage } from "@/queries/settings/store-default-image";
import { storeProfilePicture } from "@/queries/settings/store-profile-picture";
import type { DefaultImagesData } from "@/schemas/settings/default-images.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { FetchError } from "@/utils/fetch";
import { toastError, toastSuccess } from "@/utils/toast";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Image, LibraryBig } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export const pickProfilePicture = async (
  setProfilePicture: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset | null>
  >,
  setSelectedDefault: React.Dispatch<
    React.SetStateAction<DefaultImagesData["data"][0] | null>
  >
) => {
  await ImagePicker.requestMediaLibraryPermissionsAsync();

  const result = await ImagePicker.launchImageLibraryAsync({
    exif: false,
    allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });

  if (!result.canceled) {
    setProfilePicture(result.assets[0]);
    setSelectedDefault(null);
  } else {
    alert("Vous n'avez sélectionné aucune image");
  }
};

export default function AvatarPage() {
  const { theme } = useTheme();
  const { token } = useAuth();

  const {
    data,
    isLoading,
    handleRefresh: handleRefreshUser,
    isRefreshing: userIsRefreshing,
  } = useMe();
  const {
    data: defaultImages,
    handleRefresh: handleRefreshImages,
    isRefreshing: imagesAreRefreshing,
  } = useDefaultImages();

  const defaultImagePickerRef = useRef<BottomSheetModal>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const router = useRouter();

  const [selectedDefault, setSelectedDefault] = useState<
    DefaultImagesData["data"][0] | null
  >(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleRefresh = async () => {
    setProfilePicture(null);
    setSelectedDefault(null);
    handleRefreshUser();
    handleRefreshImages();
  };

  useEffect(() => {
    if (isModalOpen) {
      defaultImagePickerRef.current?.present();
    } else {
      defaultImagePickerRef.current?.dismiss();
    }
  }, [isModalOpen]);

  if (!data?.data || isLoading) {
    return <PageLoading />;
  }

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      if (profilePicture)
        await storeProfilePicture({ file: profilePicture, token: token });
      else if (selectedDefault)
        await storeDefaultImage({ image: selectedDefault, token: token });

      toastSuccess("Votre avatar a été mis à jour avec succès");
      router.replace({ pathname: "/settings", params: { refresh: "true" } });
    } catch (error) {
      if (error instanceof FetchError) {
        switch (error.status) {
          case 422:
            return toastError(
              "L'image n'a pas un format valide. Les formats acceptés sont .jpeg, .png, .jpg, .heic"
            );
          default:
            return toastError(`Erreur ${error.status} lors de la mise à jour`);
        }
      }
      toastError("Une erreur est survenue");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <RefreshView
        showsVerticalScrollIndicator={false}
        isRefreshing={userIsRefreshing || imagesAreRefreshing}
        handleRefresh={handleRefresh}
      >
        <View className="flex-1 items-center justify-center gap-6">
          <ProfilePicture
            avatar={
              profilePicture
                ? profilePicture.uri
                : selectedDefault
                ? selectedDefault.path
                : data.data.avatar_url
            }
            color={colors[theme].popover}
            imageSize={80}
            isOrganization={false}
            name={`${data.data.first_name} ${data.data.last_name}`}
            textClassName="text-4xl"
          />

          <View className="flex-row justify-between gap-2">
            <TouchableOpacity
              className="items-center gap-2 rounded-2xl bg-popover p-6"
              style={{ width: "49%" }}
              onPress={() => {
                setIsModalOpen(true);
              }}
            >
              <LibraryBig color={colors[theme].foreground} size={40} />
              <Typography
                size="h5"
                fontWeight="semibold"
                className="text-foreground"
              >
                Images par défaut
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center gap-2 rounded-2xl bg-popover p-6"
              style={{ width: "49%" }}
              onPress={() =>
                pickProfilePicture(setProfilePicture, setSelectedDefault)
              }
            >
              <Image color={colors[theme].foreground} size={40} />
              <Typography
                size="h5"
                fontWeight="semibold"
                className="text-foreground"
              >
                Votre librairie
              </Typography>
            </TouchableOpacity>
          </View>
          <Button onPress={handleSubmit} loading={isUpdating}>
            Mettre à jour
          </Button>
        </View>
      </RefreshView>
      <DefaultImagePickerModal
        ref={defaultImagePickerRef}
        data={defaultImages?.data}
        setSelectedDefault={setSelectedDefault}
        setIsModalOpen={setIsModalOpen}
        setProfilePicture={setProfilePicture}
      />
    </>
  );
}
