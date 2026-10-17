import type { Metadata } from "next";
import View, { caseStudyMeta, caseStudyParams } from "@/views/case-study";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = caseStudyParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return caseStudyMeta("en", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <View locale="en" slug={(await params).slug} />;
}
