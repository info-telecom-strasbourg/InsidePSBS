import React from "react";
import { Text, View } from "react-native";
import { BackButtonTopbar } from "../../components";
import { TEXT } from "../../constants";
import settingsStyle from "./settings.style";
import { textStyles } from "../../styles";
import SettingButton from "./SettingButton";
import { MoonIcon } from "../../assets/icons";
import { useTheme } from "../../contexts/themeContext";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

const SettingsScreen = () => {
  const styles = settingsStyle();
  const text_styles = textStyles();
  return (
    <>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.settings.title}
      </BackButtonTopbar>
      <View style={styles.container}>
        <Text style={text_styles.title4}>
          {TEXT.settings.preferences.title}
        </Text>
        <SettingButton
          text={TEXT.settings.preferences.dark_mode}
          leftIcon={
            <MoonIcon
              color={collapseTextChangeRangesAcrossMultipleVersions.text}
            />
          }
        />
      </View>
    </>
  );
};

export default SettingsScreen;
