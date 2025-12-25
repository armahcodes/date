import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Settings | DATE",
  description: "Manage your DATE account settings and preferences.",
};

// Account features are disabled during pre-order phase
export default async function SettingsPage() {
  redirect("/");
}
