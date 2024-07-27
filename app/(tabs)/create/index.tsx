import { routes } from "@/constants/routes";
import { Redirect } from "expo-router";

export default function CreatePage() {
  return <Redirect href={routes.create_post} />;
}
