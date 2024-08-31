import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/theme-context";
import { SpaceGroteskFont } from "@/utils/custom-font";
import type { EditorTheme, ToolbarTheme } from "@10play/tentap-editor";
import {
  CoreBridge,
  darkEditorTheme,
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

  const toolbarTheme: Partial<ToolbarTheme> = {
    toolbarBody: {
      borderTopColor: colors[theme].popover,
      borderBottomColor: colors[theme].popover,
      backgroundColor: colors[theme].popover,
    },
    toolbarButton: {
      backgroundColor: colors[theme].popover,
    },
    iconDisabled: {
      tintColor: "#CACACA",
    },
    iconWrapperActive: {
      backgroundColor: colors[theme].background,
    },
    iconWrapper: {
      borderRadius: 4,
      backgroundColor: colors[theme].popover,
    },
    hidden: {
      display: "none",
    },
    icon: {
      tintColor: colors[theme].foreground,
    },
    linkBarTheme: {
      addLinkContainer: {
        backgroundColor: "#474747",
        borderTopColor: "#939394",
        borderBottomColor: "#939394",
      },
      linkInput: {
        backgroundColor: "#474747",
        color: "white",
      },
      placeholderTextColor: "#B2B2B8",
      doneButton: {
        backgroundColor: "#0085FF",
      },
      doneButtonText: {
        color: "white",
      },
      linkToolbarButton: {},
    },
  };

  const editorTheme: Partial<EditorTheme> = {
    toolbar: toolbarTheme as ToolbarTheme,
  };

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
    theme: editorTheme,
  });
  editor.injectCSS(customCSS + customFont, "*");
  return editor;
};

darkEditorTheme;
