import View, { internationalMeta } from "@/views/international";

export const metadata = internationalMeta("en");

export default function Page() {
  return <View locale="en" />;
}
