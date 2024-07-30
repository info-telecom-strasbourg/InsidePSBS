import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { SpaceGroteskFont } from "@/utils/custom-font";
import {
  CoreBridge,
  PlaceholderBridge,
  TenTapStartKit,
  useEditorBridge,
} from "@10play/tentap-editor";

const customFont = `${SpaceGroteskFont}
 * {
    font-family: 'Space Grotesk', sans-serif;
  }
    `;

export const useEditor = () => {
  const { theme } = useTheme();

  const customCSS = `* {
    background-color: ${colors[theme].background};
    color: ${colors[theme].foreground};
    margin-top: 0;
    placeholder: 
  }`;

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      ...TenTapStartKit,
      PlaceholderBridge.configureExtension({
        placeholder: "Raconte ta vie ici...",
      }),
      CoreBridge.configureCSS(customCSS + customFont),
    ],
  });
  editor.injectCSS(customCSS + customFont, "*");

  return editor;
};
