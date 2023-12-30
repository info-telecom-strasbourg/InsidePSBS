import React, { useState, useRef } from "react";
import {
  BackButtonTopbar,
  Loader,
  Picker,
  PrimaryButton,
  ScreenContainer,
  TextInput,
} from "../../components";
import { API, TEXT } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { text_styles } from "../../styles";
import { useTheme } from "../../contexts";
import { Text, View, Modal } from "react-native";
import { WebView } from 'react-native-webview';
import { useFetch } from "../../hooks";
import { useLocalStorage } from "../../contexts/localStorageContext";
import axios from "axios";
import {
  checkAlreadyExist,
  checkPhone,
  checkPromotionYear,
  checkUsername,
} from "../../utils";
import { ValidIcon, InvalidIcon } from "../../assets/icons";

const ProfileEditScreen = () => {
  const { entry } = useLocalSearchParams();
  const [entryValue, setEntryValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data } = useLocalStorage();
  const { res, isLoading, error } = useFetch(`${API.url}/api/user/me`, {
    ...API.headers,
    Authorization: `Bearer ${data.token}`,
  });
  const router = useRouter();

  const { theme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const CustomHeaderWebView = (props) => {
    const { uri, onLoadStart, ...restProps } = props;
    const [currentURI, setURI] = useState(props.source.uri);
    const newSource = { ...props.source, uri: currentURI };

    return (
      <>
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            backgroundColor: '#f2f2f2', // need to change this to the theme color
            padding: 10
          }}>
          <PrimaryButton
            style={{ marginLeft: 10 }}
            text={"X"} onPress={() => { setModalVisible(false) }}
          />
        </View>
        <WebView
          {...restProps}
          useWebKit={true} 
          source={newSource}
          startInLoadingState={true} 
          onShouldStartLoadWithRequest={(request) => {
            // If we're loading the current URI, allow it to load
            if (request.url === currentURI) return true;
            // We're loading a new URL -- change state first
            setURI(request.url);
            console.log("request", request);
            // need to return true the first apparently
            //https://github.com/react-native-webview/react-native-webview/issues/1138#issuecomment-693587994
            return true;
          }}
          onMessage={(event) => {
            // Handle messages from the webview
            const { data } = event.nativeEvent;
            // console.log("data", data);
            if (data === 'Back') {
              setModalVisible(false);
              router.push("/settings/profile");
            }
          }}
          renderError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView renderError: ', nativeEvent);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </>
    );
  };

  const inputs = {
    user_name: (
      <TextInput
        inputMode={"text"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
    phone: (
      <TextInput
        inputMode={"numeric"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
    sector: <SectorPicker onValueChange={setEntryValue} value={entryValue} />,
    promotion_year: (
      <TextInput
        inputMode={"numeric"}
        value={entryValue}
        onChangeText={(v) => setEntryValue(v)}
        placeholder={res?.data[entry]}
        error={errorMessage}
      />
    ),
    unistra: (
      <>
        {res?.data.unistra_id != null ?
          <Text style={text_styles.body1(theme)}>{"\n"}{TEXT.profile.unistra_user} : <Text style={{ fontWeight: 'bold' }}>{res?.data.unistra_id}</Text></Text>
          : <Text style={text_styles.body1(theme)}>{"\n"}{TEXT.profile.unistra_no_user}</Text>}
        <PrimaryButton
          style={{ marginTop: 50 }}
          text={TEXT.profile.unistra_connection} onPress={() => { setModalVisible(true)/* ; console.log("Pressed"); console.log(modalVisible) */ }}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{ flex: 1 }}>
            <CustomHeaderWebView
              source={{
                uri: `${API.url}/api/cas`,
                headers: {
                  'Authorization': `Bearer ${data.token}`,
                },
              }}
            />
          </View>
        </Modal>
      </>
    ),
  };

  const check = {
    user_name: async () => {
      if (!checkUsername(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.user_name);
        return false;
      }
      if (!(await checkAlreadyExist(entry, entryValue))) {
        setErrorMessage(TEXT.authentification.errors.user_name_already_used);
        return false;
      }
      return true;
    },

    phone: () => {
      if (!checkPhone(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.phone);
        return false;
      }
      return true;
    },
    sector: () => true,
    promotion_year: () => {
      if (!checkPromotionYear(entryValue)) {
        setErrorMessage(TEXT.authentification.errors.promotion_year);
        return false;
      }
      return true;
    },
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!(await check[entry]())) return;
    const key = entry === "sector" ? "sector_id" : entry;
    try {
      const res = await axios.put(
        `${API.url}/api/user`,
        { [key]: entryValue },
        {
          headers: {
            ...API.headers,
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      console.log(res);
      router.back();
    } catch (e) {
      console.log(e.response.data);
    }
  };
  return (
    <ScreenContainer>
      <BackButtonTopbar rightIcon={<></>}>
        {TEXT.profile.title}
      </BackButtonTopbar>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={text_styles.title2(theme)}>{TEXT.profile[entry]}</Text>
          {inputs[entry]}
          <View height={25} />
          {inputs[entry] != inputs["unistra"] ?
            < PrimaryButton
              text={TEXT.profile.edit_profile}
              onPress={handleSubmit}
            />
            : <></>
          }
        </View>
      )}
    </ScreenContainer>
  );
};

const SectorPicker = ({ value, onValueChange }) => {
  const { res, isLoading, error } = useFetch(`${API.url}/api/sector`, {
    ...API.headers,
  });

  if (isLoading) return;

  return (
    <Picker value={value} onValueChange={onValueChange} items={res?.data} />
  );
};

export default ProfileEditScreen;
