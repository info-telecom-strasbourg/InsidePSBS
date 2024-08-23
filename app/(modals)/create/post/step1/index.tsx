import { Typography } from "@/components/primitives/typography";
import { useCreatePost } from "@/contexts/create-post.context";
import { useModalRouter } from "@/hooks/useModalRouter";
import { RichText, Toolbar } from "@10play/tentap-editor";
import { PostBodySchema } from "@app/(modals)/create/post/step2/_features/store-post.schema";
import { useMe } from "@app/(tabs)/profile/_features/me.query";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { ChoiceItem } from "./_features/choice-item";
import { CustomToolbarItems } from "./_features/custom-toolbar";
import { EmptyEditor } from "./_features/empty-post";
import { OrganizationList } from "./_features/organization-list";
import { useEditor } from "./_features/useEditor";

const CreatePostPage = () => {
  const modalRouter = useModalRouter();

  const { data } = useMe();

  const editor = useEditor();

  const { organizationId, updatePostInfo } = useCreatePost();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const organizationListRef = useRef<BottomSheetModal>(null);

  return (
    <View className="flex-1 bg-background">
      <EmptyEditor modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <View className="mb-6 w-full flex-row items-center justify-between bg-background">
        {data?.organizations ? (
          organizationId ? (
            <ChoiceItem
              isOrganization
              onPress={() => {
                Keyboard.dismiss();
                organizationListRef.current?.present();
              }}
              title={
                data.organizations.filter(
                  (item) => item.id === organizationId
                )[0].name
              }
              url={
                data.organizations.filter(
                  (item) => item.id === organizationId
                )[0].logo_url
              }
            />
          ) : (
            <ChoiceItem
              onPress={() => organizationListRef.current?.present()}
              title={`${data?.data.first_name} ${data?.data.last_name}`}
              url={data?.data.avatar_url}
              isOrganization={false}
            />
          )
        ) : (
          <View className="flex-row">
            <Typography size="h4" fontWeight="medium">
              {data?.data.first_name} {data?.data.last_name}
            </Typography>
          </View>
        )}
        <TouchableOpacity
          onPress={async () => {
            Keyboard.dismiss();
            const test = await editor.getText();

            if (!test) setModalOpen(true);
            else {
              const postBody = await editor.getJSON();
              updatePostInfo(
                "postBody",
                PostBodySchema.safeParse(postBody).data
              );
              modalRouter.open("/create/post/step2");
            }
          }}
        >
          <View className="rounded-full bg-primary p-3">
            <Typography className="text-white" fontWeight="medium" size="h4">
              Suivant
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-0 w-full"
      >
        <Toolbar editor={editor} items={CustomToolbarItems} />
      </KeyboardAvoidingView>
      <OrganizationList ref={organizationListRef} data={data} />
    </View>
  );
};

export default CreatePostPage;
