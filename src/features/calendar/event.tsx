import { Typography } from "@/components/primitives/typography";

import { ProfilePicture } from "@/components/primitives/profile-picture";
import { useModalRouter } from "@/hooks/useModalRouter";
import type { EventsData } from "@/schemas/calendar/event.schema";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { capitalize } from "@/utils/capitalize";
import { Clock, Forward, Map } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import { Text, TouchableOpacity, View } from "react-native";

export const Event = ({
  item,
}: {
  item: EventsData["data"][0] | undefined;
}) => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();

  if (!item) return null;
  return (
    <View className="mb-6 flex-1 flex-row gap-3 text-wrap rounded-2xl bg-popover p-3">
      <View
        className="w-1 rounded-full"
        style={{ backgroundColor: item?.color }}
      ></View>
      <View>
        <View className="w-full flex-row items-center justify-between gap-4 pr-6">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() =>
                modalRouter.open(`/organizations/${item?.author.id}`)
              }
            >
              <ProfilePicture
                avatar={item.author.logo_url}
                color={colors[theme].popover}
                imageSize={30}
                isOrganization={item.author.is_organization}
                name={item.author.name}
              />
            </TouchableOpacity>

            <Typography size="h5" fontWeight="semibold">
              {item?.author.short_name}
            </Typography>
          </View>

          <Typography
            size="p"
            className="rounded-full px-3 py-1 text-white"
            style={{
              backgroundColor: item?.color,
              fontFamily: "SpaceGrotesk-semibold",
            }}
          >
            {capitalize(item?.date_format.date)}
          </Typography>
        </View>
        <View className="gap-3">
          <Text
            style={{
              color: item?.color,
              fontFamily: "SpaceGrotesk-semibold",
              fontSize: 22,
            }}
          >
            {item?.title}
          </Text>

          <View className="flex-row items-center gap-2">
            <>
              <Clock color={colors[theme].foreground} size={20} />
              <Typography
                size="sm"
                className="text-muted-foreground"
                fontWeight="semibold"
              >
                {item?.date_format.start_at_simplified} -{" "}
                {item?.date_format.end_at_simplified}
              </Typography>
            </>
          </View>
          <View className="w-full flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <>
                <Map color={colors[theme].foreground} size={20} />
                <Typography
                  size="sm"
                  className="text-muted-foreground"
                  fontWeight="semibold"
                >
                  {item?.location}
                </Typography>
              </>
            </View>
            {item?.post_id ? (
              <TouchableOpacity
                className="mr-6"
                onPress={() => modalRouter.open(`/post/${item?.post_id}`)}
              >
                <Forward color={colors[theme].foreground} size={24} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export const SkeletonEvent = () => {
  const { theme } = useTheme();
  return (
    <View className="mb-6 flex-1 flex-row gap-3 text-wrap rounded-2xl bg-popover p-3">
      <Skeleton.Group show={true}>
        <View>
          <View className="mb-3 w-full flex-row items-center justify-between gap-4 pr-6">
            <View className="flex-row items-center gap-3">
              <Skeleton colorMode={theme} radius="round">
                <View className="size-12 rounded-full" />
              </Skeleton>
              <Skeleton colorMode={theme} height={30}>
                <Typography size="h5">Placeholder</Typography>
              </Skeleton>
            </View>
            <Skeleton colorMode={theme} height={30}>
              <Typography
                size="p"
                className="rounded-full px-3 py-1 text-white"
              >
                Placeholder
              </Typography>
            </Skeleton>
          </View>
          <View className="gap-3">
            <Skeleton colorMode={theme}>
              <Text
                style={{
                  fontSize: 22,
                }}
              >
                Placeholder
              </Text>
            </Skeleton>
            <View className="flex-row items-center gap-2">
              <Skeleton colorMode={theme} width={200}>
                <>
                  <Clock color={colors[theme].foreground} size={20} />
                  <Typography
                    size="sm"
                    className="text-muted-foreground"
                    fontWeight="semibold"
                  >
                    Placeholder
                  </Typography>
                </>
              </Skeleton>
            </View>
            <View className="w-full flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Skeleton colorMode={theme} width={200}>
                  <>
                    <Map color={colors[theme].foreground} size={20} />
                    <Typography
                      size="sm"
                      className="text-muted-foreground"
                      fontWeight="semibold"
                    >
                      Placeholder
                    </Typography>
                  </>
                </Skeleton>
              </View>
            </View>
          </View>
        </View>
      </Skeleton.Group>
    </View>
  );
};
