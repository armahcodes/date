import { redirect } from "next/navigation";

export const metadata = {
  title: "Shop | DATE",
  description: "Shop DATE functional beverages. Zero caffeine, zero sugar, with prebiotic fiber for your modern resilience.",
};

export default function ProductsPage() {
  redirect("/products/superior-cola-12-pack");
}
