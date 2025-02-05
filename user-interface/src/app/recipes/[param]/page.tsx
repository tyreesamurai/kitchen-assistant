import api from "@/lib/api";
import RecipePage from "@/components/pages/RecipePage";

export default async function Page({
  params,
}: {
  params: Promise<{ param: string }>;
}) {
  const param = (await params).param;
  const recipe = await api.recipes.fetchByParam(param);

  return <RecipePage recipe={recipe} />;
}
