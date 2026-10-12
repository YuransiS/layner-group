import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";
import { FACEBOOK_PIXEL_ID } from "@/lib/pixel";

export const metadata: Metadata = {
  metadataBase: new URL("https://layner-group.vercel.app"),
  title: "Layner Group — Партнёрство для владельцев тентованных машин в Европе",
  description:
    "Ежедневные загрузки по Европе для владельцев тентованных машин. Фиксированная ставка за км + гарантированный километраж каждый месяц. Оплата в евро.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Layner Group — Партнёрство по грузоперевозкам в Европе",
    description:
      "Фиксированная ставка за км, гарантированный километраж, работа по всей Европе.",
    images: ["/images/hero-truck.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
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
