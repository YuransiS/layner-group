"use client";

import { useEffect } from "react";
import { initAttribution } from "@/lib/pixel";

export function MetaPixel() {
  useEffect(() => {
    initAttribution();
  }, []);

  return null;
}
