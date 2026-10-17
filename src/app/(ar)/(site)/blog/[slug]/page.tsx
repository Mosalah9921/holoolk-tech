import type { Metadata } from "next";
import View, { articleMeta, articleParams } from "@/views/article";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = articleParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMeta("ar", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <View locale="ar" slug={(await params).slug} />;
}
