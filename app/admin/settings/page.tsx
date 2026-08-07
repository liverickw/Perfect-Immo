import AdminResourcePage from "@/components/admin/AdminResourcePage";
import ThemeSettings from "@/components/theme/ThemeSettings";

export default function AdminSettingsPage() {
  return (
    <>
      <ThemeSettings />
      <AdminResourcePage
      title="Paramètres"
      description="Gérez le nom du site, les informations de l’entreprise, le pied de page et l’accueil."
      endpoint="/admin/settings"
      listLabel="Paramètres"
      createLabel="Ajouter un paramètre"
      fields={[
        { name: "key", label: "Clé", required: true },
        { name: "value", label: "Valeur", type: "textarea", required: true },
      ]}
      />
    </>
  );
}
