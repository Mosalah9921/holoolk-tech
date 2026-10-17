import View, { legalMeta } from "@/views/legal";

export const metadata = legalMeta("en", "privacy");

export default function Page() {
  return <View locale="en" kind="privacy" />;
}
