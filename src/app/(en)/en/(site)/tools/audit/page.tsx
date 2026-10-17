import View, { auditMeta } from "@/views/audit";

export const metadata = auditMeta("en");

export default function Page() {
  return <View locale="en" />;
}
