import { LegalPage } from "@/components/legal/LegalPage";
import { getLegal } from "@/content/legal";
import { pageMeta } from "@/i18n/meta";
import type { Locale } from "@/i18n";

type Kind = "privacy" | "terms";

export function legalMeta(locale: Locale, kind: Kind) {
  const doc = getLegal(locale)[kind];
  return pageMeta(locale, { path: `/${kind}`, title: doc.title, description: doc.intro });
}

export default function LegalView({ locale, kind }: { locale: Locale; kind: Kind }) {
  const l = getLegal(locale);
  const doc = l[kind];
  return <LegalPage locale={locale} title={doc.title} updated={l.updated} intro={doc.intro} body={doc.body} />;
}
