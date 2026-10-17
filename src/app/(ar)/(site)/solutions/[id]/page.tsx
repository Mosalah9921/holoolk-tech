import type { Metadata } from "next";
import View, { solutionMeta, solutionParams } from "@/views/solution";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export const generateStaticParams = solutionParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return solutionMeta("ar", (await params).id);
}

export default async function Page({ params }: Props) {
  return <View locale="ar" id={(await params).id} />;
}
