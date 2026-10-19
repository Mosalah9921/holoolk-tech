import { siteConfig } from "@/config/site";
import { getServices } from "@/content/services";
import { getSolutions } from "@/content/solutions";
import { getArticles } from "@/content/blog";

/**
 * /llms.txt — ملخص نصي للموقع لمحركات البحث بالذكاء الاصطناعي (ChatGPT, Perplexity, Gemini…)
 * بيتولد من نفس محتوى الموقع، فأي تعديل في الخدمات أو الحلول بيظهر هنا تلقائياً.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${siteConfig.url}${p}`;
  const services = getServices("en");
  const solutions = getSolutions("en");
  const articles = getArticles("en");
  const body = `# ${siteConfig.nameEn} (${siteConfig.name})

> ${siteConfig.nameEn} is a Cairo-based IT solutions company building custom websites, online stores and cloud web systems for businesses in Egypt, the Gulf and beyond. Every site is designed and coded from scratch, in Arabic (right-to-left), English or any language the market needs. Clients work directly with the delivery team, get a written agreement before work starts, pay in three milestones tied to delivery, and own the code, domain and accounts.

## Key pages
- [Home](${u("/en")}): overview of services and industries
- [Services](${u("/en/services")}): what we build
- [Solutions by industry](${u("/en/solutions")}): ready-made solutions for ${solutions.length} industries
- [Work](${u("/en/work")}): live sample websites you can try
- [Packages](${u("/en/pricing")}): package comparison and payment terms
- [International clients](${u("/en/international")}): how remote projects work
- [Process](${u("/en/process")}): stages and deliverables
- [FAQ](${u("/en/faq")})
- [Contact](${u("/en/contact")}): WhatsApp +${siteConfig.contact.whatsapp}, ${siteConfig.contact.email}
- Arabic version of every page: same path without /en (e.g. ${u("/services")})

## Services
${services.map((s) => `- [${s.title}](${u(`/en/services/${s.id}`)}): ${s.description}`).join("\n")}

## Industries
${solutions.map((s) => `- [${s.name}](${u(`/en/solutions/${s.id}`)}): ${s.short}`).join("\n")}

## Guides
${articles.map((a) => `- [${a.title}](${u(`/en/blog/${a.slug}`)})`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
