import { redirect } from "next/navigation";

export const metadata = {
  title: "Order History | DATE",
  description: "View your complete order history and track current orders.",
};

// Account features are disabled during pre-order phase
export default async function OrdersPage() {
  redirect("/");
}
