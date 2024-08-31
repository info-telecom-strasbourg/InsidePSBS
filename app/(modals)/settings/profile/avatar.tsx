import { useAuth } from "@/auth/useAuth";
import { RefreshView } from "@/components/page/refresh-view";
import { Button } from "@/components/primitives/button";
import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Image, LibraryBig } from "lucide-react-native";
import { useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { DefaultImagePickerModal } from "../_features/default-image-picker";
import { storeProfilePicture } from "../_features/store-profile-picture";

export const pickProfilePicture = async (
  setProfilePicture: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset | null>
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
  } else {
    alert("You did not select any image.");
  }
};

export default function AvatarPage() {
  const { theme } = useTheme();
  const { data, isLoading, handleRefresh, isRefreshing } = useMe();
  const { token } = useAuth();

  const defaultImagePickerRef = useRef<BottomSheetModal>(null);
  const [profilePicture, setProfilePicture] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  if (!data?.data || isLoading) {
    return <ActivityIndicator color={colors[theme].foreground} />;
  }
  return (
    <>
      <RefreshView
        showsVerticalScrollIndicator={false}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      >
        <View className="flex-1 items-center justify-center gap-6">
          <ProfilePicture
            avatar={profilePicture ? profilePicture.uri : data.data.avatar_url}
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
                defaultImagePickerRef.current?.present();
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
              onPress={() => pickProfilePicture(setProfilePicture)}
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
          <Button
            onPress={() => {
              if (profilePicture) {
                setIsUpdating(true);
                try {
                  storeProfilePicture({ file: profilePicture, token: token });
                } catch (error) {
                  console.error(error);
                }
                setIsUpdating(false);
                handleRefresh();
              }
            }}
            loading={isUpdating}
          >
            Mettre à jour
          </Button>
        </View>
      </RefreshView>
      <DefaultImagePickerModal ref={defaultImagePickerRef} />
    </>
  );
}
