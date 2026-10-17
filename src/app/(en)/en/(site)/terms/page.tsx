import View, { legalMeta } from "@/views/legal";

export const metadata = legalMeta("en", "terms");

export default function Page() {
  return <View locale="en" kind="terms" />;
}
