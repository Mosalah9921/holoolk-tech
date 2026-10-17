import View, { bookMeta } from "@/views/book";

export const metadata = bookMeta("en");

export default function Page() {
  return <View locale="en" />;
}
