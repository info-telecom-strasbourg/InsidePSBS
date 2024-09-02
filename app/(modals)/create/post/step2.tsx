import { useAuth } from "@/auth/useAuth";
import { CustomModal } from "@/components/primitives/custom-modal";
import { Typography } from "@/components/primitives/typography";
import { useCreatePost } from "@/contexts/create-post.context";
import {
  CategoryItem,
  SkeletonCategoryItem,
} from "@/features/create/post/category-item";
import { DatePicker } from "@/features/create/post/date-picker";
import { useTimePicker } from "@/hooks/create/post/useTimePicker";
import { pickImages } from "@/queries/create/post/pick-images";
import {
  storeMedias,
  storePost,
  storePostCategories,
} from "@/queries/create/post/store-post";
import { useFilters } from "@/queries/post/filters.query";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { toastError, toastSuccess } from "@/utils/toast";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import type * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Calendar as Cal, Minus, Plus } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const CreatePostStep2 = () => {
  // Utils
  const { token } = useAuth();
  const { theme } = useTheme();

  const router = useRouter();

  // Fetching...
  const { data: filters, isLoading: filtersAreLoading } = useFilters(null);

  // Date Picker & Time Picker
  const datePickerRef = useRef<BottomSheetModal>(null);
  const today = new Date();
  const { time, setTime, showTimePicker, setShowTimePicker, formattedTime } =
    useTimePicker(today);

  // Posts Settings Context
  const { postBody, categories, organizationId, updatePostInfo, uploadedAt } =
    useCreatePost();

  // States
  const [medias, setMedias] = useState<
    ImagePicker.ImagePickerSuccessResult["assets"] | null
  >(null);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    const timeToPublish = `${uploadedAt} ${formattedTime}`;
    try {
      const postsResponse = await storePost(
        JSON.stringify(postBody),
        organizationId,
        timeToPublish,
        token
      );

      const postId = postsResponse.data.id;
      if (categories.length > 0)
        await storePostCategories(postId, categories, token);
      if (medias) await storeMedias(postId, medias, token);

      toastSuccess("Publication réussie");
      router.replace({ pathname: "/posts", params: { refresh: "true" } });
    } catch (error) {
      toastError(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-background pb-3"
        contentContainerStyle={{
          justifyContent: "space-between",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <View>
          <Typography size="h2" fontWeight="semibold" className="mb-4">
            Catégories
          </Typography>
          <View className="mb-6 flex-row flex-wrap gap-4">
            {!filters || filtersAreLoading ? (
              <Skeleton.Group show={!filters || filtersAreLoading}>
                <SkeletonCategoryItem />
                <SkeletonCategoryItem />
                <SkeletonCategoryItem />
                <SkeletonCategoryItem />
                <SkeletonCategoryItem />
                <SkeletonCategoryItem />
              </Skeleton.Group>
            ) : (
              filters.map((item, index) => {
                return (
                  <CategoryItem
                    key={index}
                    item={item}
                    categoriesSelected={categories}
                    updatePostCategories={updatePostInfo}
                  />
                );
              })
            )}
          </View>
          <Typography size="h2" fontWeight="medium" className="mb-2">
            Date de publication :
          </Typography>
          <TouchableOpacity
            onPress={() => {
              datePickerRef.current?.present();
            }}
            className="mb-4"
          >
            <View className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6">
              <Typography fontWeight="semibold">
                {format(uploadedAt, "dd/MM/yyyy")}
              </Typography>

              <Cal
                strokeWidth={1.5}
                color={colors[theme].mutedForeground}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <Typography size="h2" fontWeight="medium" className="mb-2">
            Heure de publication :
          </Typography>
          <TouchableOpacity
            onPress={() => {
              setShowTimePicker(true);
            }}
          >
            <View className="flex-row items-center justify-between rounded-2xl bg-popover p-4 px-6">
              <Typography fontWeight="semibold">{formattedTime}</Typography>

              <Cal
                strokeWidth={1.5}
                color={colors[theme].mutedForeground}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <View className="mt-4 flex-row items-center">
            <View
              style={{ width: 40, height: 40, borderRadius: 999 }}
              className="mr-3 items-center justify-center bg-primary"
            >
              <TouchableOpacity onPress={() => pickImages(setMedias)}>
                <Plus size={25} color="#ffffff" strokeWidth={3} />
              </TouchableOpacity>
            </View>
            <View className="flex-1 items-center justify-center rounded-full bg-popover p-3">
              <Typography
                size="h4"
                fontWeight="semibold"
                className="text-center text-muted-foreground"
              >
                {medias ? medias.length : 0} médias ajoutés
              </Typography>
            </View>
          </View>
          <ScrollView
            className="mt-4"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {medias
              ? medias.map((media, index) => {
                  return (
                    <View
                      key={index}
                      style={{ overflow: "visible" }}
                      className="m-2"
                    >
                      <TouchableOpacity
                        className="absolute -left-2 -top-2 z-40 items-center justify-center rounded-full bg-destructive"
                        style={{ width: 20, height: 20 }}
                        onPress={() => {
                          medias.splice(index, 1);
                          setMedias([...medias]);
                        }}
                      >
                        <Minus color={"#ffffff"} size={18} />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: media.uri }}
                        resizeMode="cover"
                        className="-z-10 size-24 rounded-2xl"
                      />
                    </View>
                  );
                })
              : null}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={handlePublish} disabled={isPublishing}>
          <View
            className="items-center justify-center rounded-full bg-primary p-4"
            style={{ opacity: isPublishing ? 0.6 : 1 }}
          >
            {isPublishing ? (
              <Typography
                className="text-center text-white"
                fontWeight="bold"
                size="h2"
              >
                Publication en cours...
              </Typography>
            ) : (
              <Typography
                className="text-center text-white"
                fontWeight="semibold"
                size="h2"
              >
                Publier
              </Typography>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
      {showTimePicker &&
        (() => {
          const dateTimePicker = (
            <DateTimePicker
              value={time || new Date()}
              mode="time"
              display="spinner"
              is24Hour={true}
              style={{
                backgroundColor: colors[theme].popover,
              }}
              timeZoneName="Europe/Paris"
              onChange={(event, selectedTime) => {
                setTime(selectedTime!);
                if (Platform.OS === "android") {
                  setShowTimePicker(false);
                }
              }}
            />
          );
          return Platform.OS === "android" ? (
            dateTimePicker
          ) : (
            <CustomModal isOpen={showTimePicker} setIsOpen={setShowTimePicker}>
              {dateTimePicker}
            </CustomModal>
          );
        })()}
      <DatePicker ref={datePickerRef} today={today} />
    </>
  );
};

export default CreatePostStep2;
