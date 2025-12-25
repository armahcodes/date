import { redirect } from "next/navigation";

export const metadata = {
  title: "Subscriptions | DATE",
  description: "Manage your DATE subscriptions. Pause, skip, or cancel anytime.",
};

// Account features are disabled during pre-order phase
export default async function SubscriptionsPage() {
  redirect("/");
}
