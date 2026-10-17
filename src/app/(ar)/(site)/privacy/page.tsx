import View, { legalMeta } from "@/views/legal";

export const metadata = legalMeta("ar", "privacy");

export default function Page() {
  return <View locale="ar" kind="privacy" />;
}
