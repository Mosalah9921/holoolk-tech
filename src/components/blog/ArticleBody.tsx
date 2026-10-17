import { Fragment } from "react";
import { Lightbulb } from "lucide-react";

/** يحوّل **نص** إلى خط عريض */
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-bold text-slate-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function slugifyHeading(t: string) {
  return t.replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-").toLowerCase();
}

/** عارض بسيط لمحتوى المقالات (## عناوين، - قوائم، > ملاحظات، فقرات) */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="text-[1.0625rem] leading-9 text-slate-700">
      {blocks.map((b, i) => {
        const block = b.trim();
        if (block.startsWith("## ")) {
          const t = block.slice(3);
          return (
            <h2 key={i} id={slugifyHeading(t)} className="mt-12 mb-4 scroll-mt-28 text-2xl font-black sm:text-[1.7rem]">
              {t}
            </h2>
          );
        }
        if (block.startsWith("- ")) {
          return (
            <ul key={i} className="my-6 space-y-3">
              {block.split("\n").map((li, j) => (
                <li key={j} className="relative ps-6 before:absolute before:top-[0.85rem] before:start-0 before:size-2 before:rounded-full before:bg-brand-500">
                  {inline(li.replace(/^- /, ""))}
                </li>
              ))}
            </ul>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <aside key={i} className="my-8 flex gap-4 rounded-2xl border border-brand-100 bg-brand-50/70 p-5 sm:p-6">
              <Lightbulb className="mt-1.5 size-5 shrink-0 text-brand-600" aria-hidden />
              <p className="font-semibold text-brand-800">{inline(block.slice(2))}</p>
            </aside>
          );
        }
        return (
          <p key={i} className="my-5">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
