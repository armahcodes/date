import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="flex w-full flex-col">
      <Header />

      <section className="color-scheme-1 min-h-[70vh] flex items-center justify-center">
        <div className="wrapper--full-padded py-16 text-center">
          {/* 404 Display */}
          <div className="mb-8">
            <span
              className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                background: "linear-gradient(135deg, #3a1f87 0%, #d40055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
          </div>

          {/* Message */}
          <h1
            className="text-black text-[28px] md:text-[36px] font-semibold mb-4 leading-tight"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Page Not Found
          </h1>
          <p className="text-black/60 text-[15px] md:text-[16px] max-w-md mx-auto mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-[#3a1f87] text-white text-[14px] font-bold uppercase tracking-[0.1em] rounded-full hover:bg-[#2d1869] transition-all duration-300"
            >
              Go Home
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 bg-transparent text-[#d40055] text-[14px] font-bold uppercase tracking-[0.1em] rounded-full border-2 border-[#d40055] hover:bg-[#d40055] hover:text-white transition-all duration-300"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
