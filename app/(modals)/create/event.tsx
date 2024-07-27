import { Button } from "@/components/primitives/button";
import { PageContainer } from "@/components/primitives/container";
import { FormTextInput } from "@/components/primitives/form-input";
import { Header } from "@/components/primitives/header";
import { useForm } from "@/hooks/useForm";
import { z } from "zod";

const CreateEventSchema = z.object({
  title: z.string().min(1, { message: "Le titre est obligatoire" }),
  place: z.string().max(3, { message: "blabla" }),
});

export default function CreateEventPage() {
  const form = useForm({
    schema: CreateEventSchema,
    defaultValues: {
      title: "",
      place: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof CreateEventSchema>) => {
    console.log(values);
  };

  return (
    <PageContainer>
      <Header title="Créer un événement" rightIcon="close" leftIcon="back" />

      <FormTextInput
        form={form}
        id="title"
        placeholder="Samed'ITS"
        label="Titre"
      />
      <FormTextInput
        form={form}
        id="place"
        placeholder="Samed'ITS"
        label="Lieu"
      />

      <Button onPress={() => form.submit(handleSubmit)}>Envoyer</Button>
    </PageContainer>
  );
}
