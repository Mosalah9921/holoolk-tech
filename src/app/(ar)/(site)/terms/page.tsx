import View, { legalMeta } from "@/views/legal";

export const metadata = legalMeta("ar", "terms");

export default function Page() {
  return <View locale="ar" kind="terms" />;
}
