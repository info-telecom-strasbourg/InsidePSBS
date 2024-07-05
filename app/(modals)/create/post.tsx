import { PageContainer } from "@/components/primitives/container";
import { Typography } from "@/components/primitives/typography";
import { Header } from "@/features/layout/header";
import { useHasOrganization } from "@/queries/create/has-organization.query";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { ChevronDown } from "lucide-react-native";
import { useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function CreatePostPage() {
  const { data } = useHasOrganization();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <BottomSheetModalProvider>
      <PageContainer>
        <Header title="Publier un post" rightIcon="close" leftIcon="back" />
        <View className="mx-4 flex-row items-center justify-between">
          {data?.organizations ? (
            <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
              <View className="flex-row items-center">
                {/* <Image source={{uri: }}/> */}
                {/* <Typography>{data}</Typography> */}
                <ChevronDown />
              </View>
            </TouchableOpacity>
          ) : (
            <View className="bg-green">{/* <Image source={{uri: }}/> */}</View>
          )}
          <TouchableOpacity>
            <View className="rounded-full bg-primary p-3">
              <Typography className="text-white" fontWeight="medium">
                Publier
              </Typography>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView className="flex-1">
          <TextInput
            placeholder="Raconte ta vie ici"
            className="items-start text-wrap bg-red"
            multiline
          />
        </ScrollView>
        <BottomSheetModal
          style={{
            zIndex: -100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          }}
          ref={bottomSheetRef}
          snapPoints={["30%"]}
          enablePanDownToClose
          overDragResistanceFactor={1}
        >
          <BottomSheetFlatList
            data={data?.organizations}
            renderItem={() => null}
          />
        </BottomSheetModal>
      </PageContainer>
    </BottomSheetModalProvider>
  );
}
