import { getDictionary } from "../lib/get-dictionary";
import { type Locale } from "../lib/i18n-config";
import HomePageClient from "./HomePageClient";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <HomePageClient dictionary={dictionary} />;
}
