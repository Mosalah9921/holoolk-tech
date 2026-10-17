import View, { processMeta } from "@/views/process";

export const metadata = processMeta("ar");

export default function Page() {
  return <View locale="ar" />;
}
