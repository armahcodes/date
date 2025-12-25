import { redirect } from "next/navigation";

export const metadata = {
  title: "My Account | DATE",
  description: "Manage your DATE account, orders, and preferences.",
};

// Account features are disabled during pre-order phase
export default async function AccountPage() {
  redirect("/");
}
