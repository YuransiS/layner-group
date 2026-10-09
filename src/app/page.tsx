"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { AboutSection } from "@/components/AboutSection";
import { TargetAudience } from "@/components/TargetAudience";
import { StepsSection } from "@/components/StepsSection";
import { FaqSection } from "@/components/FaqSection";
import { PartnerForm } from "@/components/PartnerForm";
import { Footer } from "@/components/Footer";
import { SuccessModal } from "@/components/SuccessModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLeadSuccess = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3EE] text-[#161D1C]">
      <Header />
      <main className="flex-1">
        <HeroSection onSuccess={handleLeadSuccess} />
        <WhyUsSection />
        <AboutSection />
        <TargetAudience />
        <StepsSection />
        <FaqSection />
        <PartnerForm onSuccess={handleLeadSuccess} />
      </main>
      <Footer />
      <SuccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
