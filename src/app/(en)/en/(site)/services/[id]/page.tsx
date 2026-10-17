import type { Metadata } from "next";
import View, { serviceMeta, serviceParams } from "@/views/service";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export const generateStaticParams = serviceParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return serviceMeta("en", (await params).id);
}

export default async function Page({ params }: Props) {
  return <View locale="en" id={(await params).id} />;
}
