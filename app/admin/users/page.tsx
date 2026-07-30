import AdminResourcePage from "@/components/admin/AdminResourcePage";

export default function AdminUsersPage() {
  return (
    <AdminResourcePage
      title="Users"
      description="Manage admin users, roles and account status."
      endpoint="/auth/users"
      listLabel="Équipe"
      createLabel="Inviter un utilisateur"
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", required: true },
        { name: "password", label: "Password", required: true },
        { name: "role", label: "Role", type: "select", options: ["EDITOR", "ADMIN", "SUPER_ADMIN"] },
        { name: "active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
