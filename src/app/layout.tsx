import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";
import { FACEBOOK_PIXEL_ID } from "@/lib/pixel";

export const metadata: Metadata = {
  metadataBase: new URL("https://layner-group.vercel.app"),
  title: "Layner Group — Parteneriat pentru proprietarii de camioane cu prelată în Europa",
  description:
    "Încărcături zilnice în Europa pentru proprietarii de camioane cu prelată. Tarif fix pe km + kilometraj garantat în fiecare lună. Plată în euro.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Layner Group — Parteneriat de transport de marfă în Europa",
    description:
      "Tarif fix pe km, kilometraj garantat, curse în toată Europa.",
    images: [
      {
        url: "/images/og-preview.jpg?v=2",
        width: 1024,
        height: 571,
        alt: "Layner Group — European Freight Logistics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-preview.jpg?v=2"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        {/* Meta Pixel Code */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-screen bg-[#F4F3EE] text-[#161D1C] flex flex-col selection:bg-[#237D73] selection:text-white">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
