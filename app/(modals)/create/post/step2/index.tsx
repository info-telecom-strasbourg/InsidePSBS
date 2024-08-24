import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { Typography } from "@/components/primitives/typography";
import { useCreatePost } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { useFilters } from "@app/(tabs)/posts/_features/filters.query";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import type * as ImagePicker from "expo-image-picker";
import { Calendar as Cal, Minus, Plus } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { CategoryItem } from "./_features/category-item";
import { DatePicker } from "./_features/date-picker";
import { pickImages } from "./_features/pick-images";
import {
  storeMedias,
  storePost,
  storePostCategories,
} from "./_features/store-post";
import { useTimePicker } from "./_features/useTimePicker";
import type { Href } from 'expo-router';
import { router } from 'expo-router';
import { routes } from "@/constants/routes";

const CreatePostStep2 = () => {
  // Utils
  const { token } = useAuth();
  const { theme } = useTheme();

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

  const handlePublish = useCallback(async () => {
    setIsPublishing(true);
    const timeToPublish = `${uploadedAt} ${formattedTime}`;
    try {
      const postsResponse = await storePost(
        JSON.stringify(postBody),
        organizationId,
        timeToPublish,
        token
      );
      // const parsedResPosts = await validate<StorePostResponseData>(
      //   StorePostResponseSchema,
      //   postsResponse
      // );
      const postId = postsResponse.data.id;
      const categoryResponse = await storePostCategories(
        postId,
        categories,
        token
      );
      if (medias) {
        try {
          const mediasResponse = await storeMedias(postId, medias, token);
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
    setIsPublishing(false);
    router.replace(routes.home as Href);
  }, [
    categories,
    formattedTime,
    organizationId,
    postBody,
    token,
    uploadedAt,
    medias,
  ]);

  return (
    <>
      <ScrollView
       horizontal={false}
       showsHorizontalScrollIndicator={true}
       contentContainerStyle={{justifyContent: "space-between"}}
       className="flex-1 bg-background pb-4">
        <View>
          <Typography size="h2" fontWeight="semibold" className="mb-4">
            Catégories
          </Typography>
          <View className="mb-6 flex-row flex-wrap gap-4">
            {!filters || filtersAreLoading ? (
              <PageLoading />
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
              className="items-center justify-center bg-primary"
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
                      className="z-1"
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
                        key={index}
                        resizeMode="cover"
                        className="z-1 relative mr-3 size-24 rounded-2xl"
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
      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          is24Hour={true}
          timeZoneName="UTC+01:00"
          onChange={(event, selectedTime) => {
            setTime(selectedTime!);
            setShowTimePicker(false);
          }}
        />
      )}
      <DatePicker ref={datePickerRef} today={today} />
    </>
  );
};

export default CreatePostStep2;
