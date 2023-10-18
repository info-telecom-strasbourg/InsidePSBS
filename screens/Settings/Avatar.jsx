import * as ImagePicker from "expo-image-picker";
import { Image, TouchableOpacity, View } from "react-native";
import { CameraIcon } from "../../assets/icons";
import { COLORS } from "../../constants";
import { useTheme } from "../../contexts";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import axios from "axios";
import { API } from "../../constants";
import { useLocalStorage } from "../../contexts/localStorageContext";

const Avatar = ({ url, pressable = false }) => {
  const { data } = useLocalStorage();
  const handleImagePress = async () => {
    const sizeTarget = 512;
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(data.token);

    if (!result.canceled) {
      try {
        const manipResult = await manipulateAsync(
          result.assets[0].uri,
          [
            {
              resize: {
                height: sizeTarget,
                width: sizeTarget,
              },
            },
          ],
          { compress: 1, format: SaveFormat.JPEG }
        );
        console.log(typeof manipResult);
        console.log(manipResult);

        const formData = new FormData();
        formData.append("avatar", {
          uri: manipResult.uri,
          name: "avatar.jpg",
          type: "image/jpeg",
        });
        const res = await axios
          .post(
            `${API.url}/api/user/avatar`,
            { avatar: manipResult },
            {
              headers: {
                ...API.headers,
                Authorization: `Bearer ${data.token}`,
                "Content-Type": "multipart/form-data",
              },
              transformRequest: (data, headers) => {
                // !!! override data to return formData
                // since axios converts that to string
                return formData;
              },
            }
          )
          .then((res) => {
            console.log(res);
            console.log("sent");
          });
      } catch (e) {
        console.error(e);
        console.log(e.response.data);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={handleImagePress}
      disabled={!pressable}
      style={{
        width: 80,
        height: 80,
        position: "relative",
        overflow: "hidden",
        borderRadius: 80,
      }}
    >
      <Image source={{ uri: url }} width={80} height={80} />
      {pressable && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "40%",
            backgroundColor: "#00000080",
            bottom: 0,
            padding: 5,
            alignItems: "center",
          }}
        >
          <CameraIcon height={13} width={13} color={COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
