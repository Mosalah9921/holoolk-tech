"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * غلاف نماذج المواقع النموذجية: بيعرض رسالة نجاح بدل ما يبعت فعلاً.
 * في الموقع الحقيقي للعميل، الطلب بيوصل لواتساب أو إيميل صاحب النشاط.
 */
export function DemoForm({
  children,
  className,
  successTitle,
  successClassName,
}: {
  children: React.ReactNode;
  className?: string;
  successTitle: string;
  successClassName?: string;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div role="status" className={successClassName}>
        <CheckCircle2 className="mx-auto size-12" aria-hidden />
        <p className="mt-4 text-xl font-bold">{successTitle}</p>
        <p className="mt-2 text-sm opacity-75">هذا موقع نموذجي؛ في الموقع الفعلي يصل الطلب فوراً إلى صاحب النشاط عبر واتساب.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-5 text-sm font-bold underline underline-offset-4">
          إعادة التجربة
        </button>
      </div>
    );
  }

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {children}
    </form>
  );
}
