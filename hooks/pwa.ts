"use client";
import { useState, Suspense } from "react";

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  if (typeof window !== "undefined") {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });
  }

  if (deferredPrompt) {
    deferredPrompt.prompt();
    setDeferredPrompt(null);
  }

  return { deferredPrompt };
}
