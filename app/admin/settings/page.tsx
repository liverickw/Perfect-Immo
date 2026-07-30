import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminSettingsPage() {
  return (
    <AdminResourcePage
      title="Settings"
      description="Manage website name, company info, footer and homepage settings."
      endpoint="/admin/settings"
      listLabel="Paramètres"
      createLabel="Ajouter un paramètre"
      fields={[
        { name: "key", label: "Key", required: true },
        { name: "value", label: "Value", type: "textarea", required: true },
      ]}
    />
  );
}
