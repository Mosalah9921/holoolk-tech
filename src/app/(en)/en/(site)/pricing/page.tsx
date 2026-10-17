import View, { pricingMeta } from "@/views/pricing";

export const metadata = pricingMeta("en");

export default function Page() {
  return <View locale="en" />;
}
