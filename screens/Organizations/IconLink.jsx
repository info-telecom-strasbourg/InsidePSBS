import React from "react";
import {TouchableOpacity} from "react-native";

const IconLink = ({link, icon, onPress}) => {
    if (!link) return null;
    return (
        <TouchableOpacity style={{marginHorizontal: 15, marginVertical: 15}} onPress={onPress}>
            {icon}
        </TouchableOpacity>
    );
};

export default IconLink;
