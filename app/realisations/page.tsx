import { Cormorant_Garamond, Outfit } from "next/font/google";
import { api, safeApi } from "@/lib/api/client";
import type { ApiRealisation } from "@/lib/api/types";
import { defaultRealisations, sortRealisations } from "@/lib/realisations-default";
import RealisationsClient from "@/components/realisations/RealisationsClient";
import styles from "./realisations.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--portfolio-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--portfolio-sans",
  display: "swap",
});

export default async function RealisationsPage() {
  const realisations = await safeApi<ApiRealisation[]>(
    () => api.getRealisations(),
    defaultRealisations,
  );

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <RealisationsClient
        realisations={sortRealisations(realisations.length ? realisations : defaultRealisations)}
      />
    </main>
  );
}
