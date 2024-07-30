import { Typography } from "@/components/primitives/typography";
import type { UpdatePostInfoType } from "@/contexts/create-post.context";
import { useCreatePost } from "@/contexts/create-post.context";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import type { ItsMeUserData } from "@app/(tabs)/profile/_features/me.schema";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Circle } from "lucide-react-native";
import { forwardRef, useMemo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const OrganizationList = forwardRef<
  BottomSheetModal,
  { data: ItsMeUserData | undefined }
>(function OrganizationList({ data }, ref) {
  const { theme } = useTheme();
  const { updatePostInfo, organizationId } = useCreatePost();

  const animatedIndex = useSharedValue<number>(0);
  const animatedPosition = useSharedValue<number>(0);
  const snapPoints = useMemo(() => ["40%"], []);

  return (
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
        padding: 15,
      }}
      ref={ref}
      snapPoints={snapPoints}
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
      <BottomSheetScrollView>
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => {
            updatePostInfo("organizationId", null);
          }}
        >
          <View className="flex-1 flex-row items-center gap-4">
            <Image
              source={{ uri: data?.data.avatar_url }}
              className="size-14"
              resizeMode="cover"
            />
            <Typography size="h4" fontWeight="medium" className="line-clamp-1">
              {data?.data.first_name} {data?.data.last_name}
            </Typography>
          </View>
          <Circle
            size={20}
            fill={
              organizationId === null
                ? colors[theme].primary
                : colors[theme].secondary
            }
            color={
              organizationId === null
                ? colors[theme].primary
                : colors[theme].secondary
            }
          />
        </TouchableOpacity>
        {data?.organizations.map((item, index) => (
          <RenderOrganization
            key={index}
            organization={item}
            organizationId={organizationId}
            updatePostInfo={updatePostInfo}
          />
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const RenderOrganization = ({
  organization,
  organizationId,
  updatePostInfo,
}: {
  organization: ItsMeUserData["organizations"][0];
  organizationId: number | null;
  updatePostInfo: UpdatePostInfoType;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between"
      onPress={() => {
        updatePostInfo("organizationId", organization.id);
      }}
    >
      <View className="flex-row items-center gap-4">
        <Image
          source={{ uri: organization.logo_url }}
          className="size-14"
          resizeMode="cover"
        />
        <Typography size="h4" fontWeight="medium" className="line-clamp-1">
          {organization.name}
        </Typography>
      </View>
      <Circle
        size={20}
        fill={
          organizationId === organization.id
            ? colors[theme].primary
            : colors[theme].secondary
        }
        color={
          organizationId === organization.id
            ? colors[theme].primary
            : colors[theme].secondary
        }
      />
    </TouchableOpacity>
  );
};
