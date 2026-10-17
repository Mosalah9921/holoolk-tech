import View, { processMeta } from "@/views/process";

export const metadata = processMeta("en");

export default function Page() {
  return <View locale="en" />;
}
