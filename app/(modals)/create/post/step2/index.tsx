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
import { Calendar as Cal } from "lucide-react-native";
import { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { CategoryItem } from "./_features/category-item";
import { DatePicker } from "./_features/date-picker";
import { storePost, storePostCategories } from "./_features/store-post";
import { useTimePicker } from "./_features/useTimePicker";

const CreatePostStep2 = () => {
  const { token } = useAuth();
  const { theme } = useTheme();

  const { data: filters, isLoading: filtersAreLoading } = useFilters(null);
  const { postBody, categories, organizationId, updatePostInfo, uploadedAt } =
    useCreatePost();
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const datePickerRef = useRef<BottomSheetModal>(null);

  const today = new Date();
  const { time, setTime, showTimePicker, setShowTimePicker, formattedTime } =
    useTimePicker(today);

  const handlePublish = async () => {
    setIsPublishing(true);
    const timeToPublish = `${uploadedAt} ${formattedTime}`;
    const res = await storePost(
      JSON.stringify(postBody),
      organizationId,
      timeToPublish,
      token
    );
    const postId = res?.data?.id;
    const res_category = await storePostCategories(postId, categories, token);
    console.log("Post published");
    setIsPublishing(false);
    // add medias to post if needed
  };

  return (
    <>
      <View className="flex-1 justify-between bg-background pb-3">
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
              datePickerRef.current?.present();
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
      <DatePicker ref={datePickerRef} today={today} />
    </>
  );
};

export default CreatePostStep2;
