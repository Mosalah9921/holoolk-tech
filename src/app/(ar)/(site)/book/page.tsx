import View, { bookMeta } from "@/views/book";

export const metadata = bookMeta("ar");

export default function Page() {
  return <View locale="ar" />;
}
