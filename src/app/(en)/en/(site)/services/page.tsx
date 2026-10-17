import View, { servicesMeta } from "@/views/services";

export const metadata = servicesMeta("en");

export default function Page() {
  return <View locale="en" />;
}
