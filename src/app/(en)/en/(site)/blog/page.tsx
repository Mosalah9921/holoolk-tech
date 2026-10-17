import View, { blogMeta } from "@/views/blog";

export const metadata = blogMeta("en");

export default function Page() {
  return <View locale="en" />;
}
