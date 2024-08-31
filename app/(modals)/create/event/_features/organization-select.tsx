import { ProfilePicture } from "@/components/primitives/profile-picture";
import { Typography } from "@/components/primitives/typography";
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
import { TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const OrganizationSelect = forwardRef<
  BottomSheetModal,
  {
    data: ItsMeUserData | undefined;
    organizationId: number | null;
    setOrganizationId: React.Dispatch<React.SetStateAction<number | null>>;
  }
>(function OrganizationList({ data, organizationId, setOrganizationId }, ref) {
  const { theme } = useTheme();

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
      backgroundStyle={{ backgroundColor: colors[theme].background }}
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
        {data?.organizations.map((item, index) => (
          <RenderOrganization
            key={index}
            organization={item}
            organizationId={organizationId}
            setOrganizationId={setOrganizationId}
          />
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const RenderOrganization = ({
  organization,
  organizationId,
  setOrganizationId,
}: {
  organization: ItsMeUserData["organizations"][0];
  organizationId: number | null;
  setOrganizationId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      className="mb-3 flex-row items-center justify-between"
      onPress={() => {
        setOrganizationId(organization.id);
      }}
    >
      <View className="flex-row items-center gap-4">
        {/* <Image
          source={{ uri: organization.logo_url }}
          className="size-14"
          resizeMode="cover"
        /> */}
        <ProfilePicture
          avatar={organization.logo_url}
          imageSize={50}
          isOrganization
          name={organization.name}
          color={colors[theme].popover}
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
