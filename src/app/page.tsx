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
import { LeadModal } from "@/components/LeadModal";
import { SuccessModal } from "@/components/SuccessModal";

export default function Home() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleLeadSuccess = () => {
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3EE] text-[#161D1C]">
      <Header onOpenModal={() => setLeadModalOpen(true)} />
      <main className="flex-1">
        <HeroSection onOpenModal={() => setLeadModalOpen(true)} />
        <WhyUsSection />
        <AboutSection />
        <TargetAudience />
        <StepsSection />
        <FaqSection />
        <PartnerForm onSuccess={handleLeadSuccess} />
      </main>
      <Footer />

      {/* Модальное окно для мобильной версии с единой формой */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSuccess={handleLeadSuccess}
      />

      {/* Окно подтверждения успешной отправки */}
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
}
