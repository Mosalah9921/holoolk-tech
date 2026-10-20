import Script from "next/script";

/**
 * Google Analytics 4 + Facebook (Meta) Pixel.
 * GA4 الرسمي للموقع: G-DB548NJ00R (ممكن يتغيّر من NEXT_PUBLIC_GA_ID في Vercel).
 * الـ Pixel بيتفعّل بس لما تحط NEXT_PUBLIC_FB_PIXEL_ID.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-DB548NJ00R";
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {PIXEL_ID && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
