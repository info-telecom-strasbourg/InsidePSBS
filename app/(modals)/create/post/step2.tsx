import { useAuth } from "@/auth/useAuth";
import { PageLoading } from "@/components/page/loading";
import { Typography } from "@/components/primitives/typography";
import type { UpdatePostInfoType } from "@/contexts/create-post.context";
import { useCreatePost } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { postQuery } from "@/utils/post-query";
import type {
  StorePostCategoriesData,
  StorePostData,
} from "@app/(modals)/create/post/_features/store-post.schema";
import {
  StorePostCategoriesSchema,
  StorePostSchema,
} from "@app/(modals)/create/post/_features/store-post.schema";
import type { CategoriesData } from "@app/(tabs)/posts/_features/categories.schema";
import { useFilters } from "@app/(tabs)/posts/_features/filters.query";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FlashList } from "@shopify/flash-list";
import { format } from "date-fns";
import { Calendar as Cal } from "lucide-react-native";
import { memo, useMemo, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const CategoryItem = memo(function CategoryItem({
  item,
  categoriesSelected,
  updatePostCategories,
}: {
  item: CategoriesData["data"][0];
  categoriesSelected: number[] | null;
  updatePostCategories: UpdatePostInfoType;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { theme } = useTheme();

  return (
    <TouchableOpacity
      className="rounded-full px-4 py-1"
      style={{
        borderColor: item.color,
        borderWidth: 1,
        backgroundColor: isSelected ? item.color : colors[theme].background,
      }}
      onPress={() => {
        if (isSelected) {
          const elementToRemove = categoriesSelected?.findIndex(
            (i) => i === item.id
          );
          updatePostCategories(
            "categories",
            categoriesSelected?.filter(
              (_, index) => index !== elementToRemove
            ) || []
          );
        } else
          updatePostCategories("categories", [
            ...(categoriesSelected || []),
            item.id,
          ]);
        setIsSelected(!isSelected);
      }}
      disabled={categoriesSelected!.length >= 3 && !isSelected}
    >
      <Typography
        size="p"
        className={isSelected ? "text-white" : colors[theme].foreground}
      >
        {item.emoji} {item.name}
      </Typography>
    </TouchableOpacity>
  );
});

const CreatePostStep2 = () => {
  const { data: filters, isLoading: filtersAreLoading } = useFilters(null);

  const { token } = useAuth();
  const { theme } = useTheme();

  const dateBottomSheet = useRef<BottomSheetModal>(null);
  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = useMemo(() => ["80%"], []);

  const today = new Date();
  // console.log(format(today, "yyyy-MM-dd HH:mm:ss"));
  const [time, setTime] = useState<Date>(today);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const formattedTime = format(time, "HH:mm");

  const { postBody, categories, organizationId, updatePostInfo, uploadedAt } =
    useCreatePost();

  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const storePost = async (
    postBody: string,
    organizationId: number | null,
    uploadedAt: string | null
  ) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/contents`;
    const response = await postQuery<StorePostData>(
      url,
      token,
      {
        create_post: 1,
        body: postBody,
        organization_id: organizationId,
        uploaded_at: uploadedAt,
      },
      StorePostSchema
    );
    return response;
  };

  const storePostCategories = async (
    postId: number,
    categories: number[],
    eventId?: number
  ) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/categories`;
    const response = await postQuery<StorePostCategoriesData>(
      url,
      token,
      {
        post_id: postId,
        event_id: eventId,
        category_ids: categories,
      },
      StorePostCategoriesSchema
    );
    return response;
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    const timeToPublish = `${uploadedAt} ${formattedTime}`;
    const res = await storePost(
      JSON.stringify(postBody),
      organizationId,
      timeToPublish
    );
    const postId = res?.data?.id;
    const res_category = await storePostCategories(postId, categories);
    console.log("Post published");
    setIsPublishing(false);
  };
  // add medias to post if needed

  return (
    <>
      <View className=" flex-1 justify-between pb-3">
        <View>
          <Typography size="h2" fontWeight="bold" className="mb-6">
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
          <Typography size="h2" fontWeight="bold" className="mb-4">
            Date de publication :
          </Typography>
          <TouchableOpacity
            onPress={() => {
              dateBottomSheet.current?.present();
            }}
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
          <Typography size="h2" fontWeight="bold" className="mb-4">
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
        </View>
        <TouchableOpacity onPress={handlePublish}>
          <View className="items-center justify-center rounded-full bg-primary p-4">
            {isPublishing ? (
              <ActivityIndicator color="white" />
            ) : (
              <Typography
                className="text-center text-white"
                fontWeight="bold"
                size="h2"
              >
                Publier
              </Typography>
            )}
          </View>
        </TouchableOpacity>
      </View>
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
      <BottomSheetModal
        style={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          margin: 15,
        }}
        bottomInset={30}
        ref={dateBottomSheet}
        snapPoints={snapPoints}
        detached={true}
        enablePanDownToClose
        enableDismissOnClose
        overDragResistanceFactor={1}
        backgroundStyle={{ backgroundColor: colors[theme].secondary }}
        backdropComponent={() => (
          <BottomSheetBackdrop
            pressBehavior={"close"}
            animatedIndex={animatedIndex}
            animatedPosition={animatedPosition}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          ></BottomSheetBackdrop>
        )}
      >
        <Calendar.List
          CalendarScrollComponent={FlashList}
          calendarMinDateId={toDateId(today)}
          calendarInitialMonthId={toDateId(today)}
          onCalendarDayPress={(dateId) => {
            updatePostInfo("uploadedAt", dateId);
          }}
        />
      </BottomSheetModal>
    </>
  );
};

export default CreatePostStep2;
