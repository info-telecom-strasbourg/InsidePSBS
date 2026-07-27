import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const homeIcon = MaterialDesignIcons.getImageSourceSync("home", 24, "black");
const homeOutlinedIcon = MaterialDesignIcons.getImageSourceSync(
  "home-outline",
  24,
  "black",
);

const addIcon = MaterialDesignIcons.getImageSourceSync("plus-box", 24, "black");
const addOutlinedIcon = MaterialDesignIcons.getImageSourceSync(
  "plus-box-outline",
  24,
  "black",
);

const feedIcon = MaterialDesignIcons.getImageSourceSync(
  "newspaper-variant",
  24,
  "black",
);
const feedOutlinedIcon = MaterialDesignIcons.getImageSourceSync(
  "newspaper-variant-outline",
  24,
  "black",
);

const profileIcon = MaterialDesignIcons.getImageSourceSync(
  "account",
  24,
  "black",
);
const profileOutlinedIcon = MaterialDesignIcons.getImageSourceSync(
  "account-outline",
  24,
  "black",
);

export default function ApplicationTabs() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
          src={{ default: homeOutlinedIcon, selected: homeIcon }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="calendar">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon sf="calendar" md="calendar_today" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="create">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{ default: "plus.app", selected: "plus.app.fill" }}
          src={{ default: addOutlinedIcon, selected: addIcon }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="feed">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          sf={{ default: "newspaper", selected: "newspaper.fill" }}
          src={{ default: feedOutlinedIcon, selected: feedIcon }}
        />
        <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: "person", selected: "person.fill" }}
          src={{ default: profileOutlinedIcon, selected: profileIcon }}
        />
        <NativeTabs.Trigger.Label hidden />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
