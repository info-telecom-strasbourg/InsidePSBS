import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React from "react";
import { Platform } from "react-native";

export function ExternalLink(
  properties: Omit<React.ComponentProps<typeof Link>, "href"> & {
    href: string;
  },
) {
  return (
    <Link
      hrefAttrs={{
        // On web, launch the link in a new tab.
        target: "_blank",
      }}
      {...properties}
      // @ts-expect-error: External URLs are not typed.
      href={properties.href}
      onPress={(e) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          openBrowserAsync(properties.href as string);
        }
      }}
    />
  );
}
