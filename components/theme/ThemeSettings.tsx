"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, THEME_STORAGE_KEY, type ThemePreference } from "@/components/theme/ThemeManager";

const options: Array<{ value: ThemePreference; label: string; description: string; icon: string }> = [
  { value: "light", label: "Clair", description: "Toujours utiliser le thème clair", icon: "ti-sun" },
  { value: "dark", label: "Sombre", description: "Toujours utiliser le thème sombre", icon: "ti-moon" },
  { value: "system", label: "Système", description: "Suivre le réglage de cet appareil", icon: "ti-device-desktop" },
];

const themeChangeEvent = "perfect-immo-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
}

function getPreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

export default function ThemeSettings() {
  const preference = useSyncExternalStore(subscribe, getPreference, () => "system");

  function selectTheme(value: ThemePreference) {
    localStorage.setItem(THEME_STORAGE_KEY, value);
    applyTheme(value);
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <section className="theme-settings" aria-labelledby="theme-settings-title">
      <div className="theme-settings-head">
        <h3 id="theme-settings-title">Apparence du site</h3>
        <p>Choisissez le thème utilisé sur le site public et le tableau de bord.</p>
      </div>
      <div className="theme-options" role="radiogroup" aria-label="Thème du site">
        {options.map((option) => (
          <button key={option.value} type="button" className={`theme-option ${preference === option.value ? "selected" : ""}`} role="radio" aria-checked={preference === option.value} onClick={() => selectTheme(option.value)}>
            <i className={`ti ${option.icon}`} aria-hidden="true" />
            <span><strong>{option.label}</strong><small>{option.description}</small></span>
            <i className="ti ti-check theme-option-check" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
