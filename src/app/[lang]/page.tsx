import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { Language } from "@/data/translations";

export function generateStaticParams() {
  return [{ lang: "ro" }, { lang: "bg" }, { lang: "ru" }];
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang === "ro") {
    return {
      title: "Layner Group — Parteneriat pentru proprietarii de camioane cu prelată în Europa",
      description:
        "Încărcături zilnice în Europa pentru proprietarii de camioane cu prelată. Tarif fix pe km + kilometraj garantat în fiecare lună. Plată în euro.",
      openGraph: {
        title: "Layner Group — Parteneriat de transport de marfă în Europa",
        description:
          "Tarif fix pe km, kilometraj garantat, curse în toată Europa.",
        images: ["/images/hero-truck.jpg"],
      },
    };
  }
  if (lang === "bg") {
    return {
      title: "Layner Group — Партньорство за собственици на тентови камиони в Европа",
      description:
        "Ежедневни товари из цяла Европа за собственици на тентови камиони. Фиксирана ставка на км + гарантиран километраж всеки месец. Плащане в евро.",
      openGraph: {
        title: "Layner Group — Партньорство за товарен транспорт в Европа",
        description:
          "Фиксирана ставка на км, гарантиран километраж, работа из цяла Европа.",
        images: ["/images/hero-truck.jpg"],
      },
    };
  }
  return {
    title: "Layner Group — Партнёрство для владельцев тентованных машин в Европе",
    description:
      "Ежедневные загрузки по Европе для владельцев тентованных машин. Фиксированная ставка за км + гарантированный километраж каждый месяц. Оплата в евро.",
    openGraph: {
      title: "Layner Group — Партнёрство по грузоперевозкам в Европе",
      description:
        "Фиксированная ставка за км, гарантированный километраж, работа по всей Европе.",
      images: ["/images/hero-truck.jpg"],
    },
  };
}

export default async function LangPage({ params }: PageProps) {
  const { lang } = await params;

  if (lang !== "ro" && lang !== "bg" && lang !== "ru") {
    notFound();
  }

  return <LandingPage initialLang={lang as Language} />;
}
