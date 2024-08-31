import { Images, type ToolbarItem } from "@10play/tentap-editor";

export enum ToolbarContext {
  Main,
  Link,
  Heading,
}
// export const HEADING_ITEMS: ToolbarItem[] = [
//   {
//     onPress:
//       ({ setToolbarContext }) =>
//       () =>
//         setToolbarContext(ToolbarContext.Main),
//     active: () => false,
//     disabled: () => false,
//     image: () => Images.close,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(1),
//     active: ({ editorState }) => editorState.headingLevel === 1,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h1,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(2),
//     active: ({ editorState }) => editorState.headingLevel === 2,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h2,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(3),
//     active: ({ editorState }) => editorState.headingLevel === 3,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h3,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(4),
//     active: ({ editorState }) => editorState.headingLevel === 4,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h4,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(5),
//     active: ({ editorState }) => editorState.headingLevel === 5,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h5,
//   },
//   {
//     onPress:
//       ({ editor }) =>
//       () =>
//         editor.toggleHeading(6),
//     active: ({ editorState }) => editorState.headingLevel === 6,
//     disabled: ({ editorState }) => !editorState.canToggleHeading,
//     image: () => Images.h6,
//   },
// ];

export const CustomToolbarItems: ToolbarItem[] = [
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBold(),
    active: ({ editorState }) => editorState.isBoldActive,
    disabled: ({ editorState }) => !editorState.canToggleBold,
    image: () => Images.bold,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleItalic(),
    active: ({ editorState }) => editorState.isItalicActive,
    disabled: ({ editorState }) => !editorState.canToggleItalic,
    image: () => Images.italic,
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleUnderline(),
    active: ({ editorState }) => editorState.isUnderlineActive,
    disabled: ({ editorState }) => !editorState.canToggleUnderline,
    image: () => Images.underline,
  },
  {
    onPress:
      ({ setToolbarContext }) =>
      () =>
        setToolbarContext(ToolbarContext.Heading),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.Aa,
  },
];
