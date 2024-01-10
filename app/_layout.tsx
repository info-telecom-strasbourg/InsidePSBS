import { DeveloperBadge } from "components/Badge";
import { WebContainer } from "components/Containers";
import Provider from "contexts/Provider";
import { Stack } from "expo-router";
import { PropsWithChildren } from "react";
import { Platform, SafeAreaView, View } from "react-native";

import StatusBar from "../components/StatusBar";
import { useTheme } from "../contexts/themeContext";

// const AppLayout = () => {
// lock screen orientation
// useEffect(() => {
//   if (Platform.OS === "web") return;

// const lock = async () => {
//   await ScreenOrientation.lockAsync(
//     ScreenOrientation.OrientationLock.PORTRAIT,
//   );
// };

// lock();
//   return () => {
//     ScreenOrientation.unlockAsync();
//   };
// }, []);

//   const Container = Platform.OS === "web" ? WebContainer : View;

//   return (
//     <>
//       <LocalStorageProvider>
//         <ThemeProvider>
//           <AuthProvider>
//             <RootSiblingParent>
//               <StatusBar />
//               <Container style={{ flex: 1 }}>
//                 <Stack
//                   screenOptions={{
//                     headerShown: false,
//                     animation: "fade_from_bottom",
//                   }}>
//                   {/* <Stack.Screen name="(tabs)" options={{ animation: "fade" }} /> */}
//                 </Stack>
//               </Container>
//             </RootSiblingParent>
//           </AuthProvider>
//         </ThemeProvider>
//       </LocalStorageProvider>
//     </>
//   );
// };

const AppLayout = () => {
  return (
    <Provider>
      <StatusBar />
      <AppContainer>
        <DeveloperBadge />
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </AppContainer>
    </Provider>
  );
};

const AppContainer = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {Platform.OS === "web" ? (
        <WebContainer>{children}</WebContainer>
      ) : (
        <View style={{ position: "relative", flex: 1 }}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default AppLayout;
