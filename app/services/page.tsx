import { Cormorant_Garamond, Outfit } from "next/font/google";
import { api, safeApi } from "@/lib/api/client";
import type { ApiService, ServicePageSettings } from "@/lib/api/types";
import { defaultServices, servicePageDefaults } from "@/lib/services-default";
import ServicesClient from "@/components/services/ServicesClient";
import styles from "./services.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--services-serif",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--services-sans",
  display: "swap",
});

export default async function ServicesPage() {
  const services = await safeApi<ApiService[]>(
    () => api.getServices(),
    defaultServices,
  );
  const pageSettings = await safeApi<ServicePageSettings>(
    () => api.getServicePageSettings(),
    servicePageDefaults,
  );

  return (
    <main className={`${styles.pageCenter} ${serif.variable} ${sans.variable}`}>
      <ServicesClient
        services={services.length ? services : defaultServices}
        pageSettings={pageSettings}
      />
    </main>
  );
}
