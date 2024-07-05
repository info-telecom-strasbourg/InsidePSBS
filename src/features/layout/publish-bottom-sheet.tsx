import { Typography } from "@/components/primitives/typography";
import { routes } from "@/constants/routes";
import { useModalRouter } from "@/hooks/useModalRouter";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { CalendarPlus, CopyPlus, FilePlus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const PublishBottomSheet = () => {
  const { theme } = useTheme();
  const modalRouter = useModalRouter();

  return (
    <>
      <TouchableOpacity
        className="flex-row items-center gap-3"
        onPress={() => modalRouter.open(routes.create_post)}
      >
        <FilePlus size={32} color={colors[theme].foreground} />
        <Typography size="h3" fontWeight="semibold" className="text-foreground">
          Publication
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-3"
        onPress={() => modalRouter.open(routes.create_event)}
      >
        <CalendarPlus size={32} color={colors[theme].foreground} />
        <Typography size="h3" fontWeight="semibold" className="text-foreground">
          Évènement
        </Typography>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center gap-3"
        onPress={() => modalRouter.open(routes.create_both)}
      >
        <CopyPlus size={32} color={colors[theme].foreground} />
        <Typography size="h3" fontWeight="semibold" className="text-foreground">
          Les deux
        </Typography>
      </TouchableOpacity>
    </>
  );
};

export default PublishBottomSheet;
