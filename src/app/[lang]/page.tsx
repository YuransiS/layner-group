import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { Language } from "@/data/translations";

export function generateStaticParams() {
  return [{ lang: "ro" }, { lang: "bg" }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const ogImages = [
    {
      url: "/images/og-preview.jpg?v=2",
      width: 1024,
      height: 571,
      alt: "Layner Group — European Freight Logistics",
    },
  ];

  if (lang === "bg") {
    return {
      title: "Layner Group — Партньорство за собственици на тентови камиони в Европа",
      description:
        "Ежедневни товари из цяла Европа за собственици на тентови камиони. Фиксирана ставка на км + гарантиран километраж всеки месец. Плащане в евро.",
      openGraph: {
        title: "Layner Group — Партньорство за товарен транспорт в Европа",
        description:
          "Фиксирана ставка на км, гарантиран километраж, работа из цяла Европа.",
        images: ogImages,
      },
      twitter: {
        card: "summary_large_image",
        images: ["/images/og-preview.jpg?v=2"],
      },
    };
  }

  // Default is Romanian (ro)
  return {
    title: "Layner Group — Parteneriat pentru proprietarii de camioane cu prelată în Europa",
    description:
      "Încărcături zilnice în Europa pentru proprietarii de camioane cu prelată. Tarif fix pe km + kilometraj garantat în fiecare lună. Plată în euro.",
    openGraph: {
      title: "Layner Group — Parteneriat de transport de marfă în Europa",
      description:
        "Tarif fix pe km, kilometraj garantat, curse în toată Europa.",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      images: ["/images/og-preview.jpg?v=2"],
    },
  };
}

export default async function LangPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang === "ru") {
    redirect("/");
  }

  if (lang !== "ro" && lang !== "bg") {
    notFound();
  }

  return <LandingPage initialLang={lang as Language} />;
}
