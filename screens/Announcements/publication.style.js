import {StyleSheet} from "react-native";
import {COLORS} from "../../constants";

const styles = StyleSheet.create({
    container: ({box = COLORS.box_light}) => ({
        backgroundColor: box,
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 10,
    }),
    image: () => ({
        width: 40,
        height: 40,
        borderRadius: 15,
    })
});

export default styles;