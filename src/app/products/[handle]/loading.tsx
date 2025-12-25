export default function ProductLoading() {
  return (
    <main className="flex w-full flex-col">
      {/* Header placeholder */}
      <div className="h-[63px] md:h-[81px] bg-[#f5f5f5]" />

      <section className="color-scheme-1 min-h-screen">
        <div className="wrapper--full-padded py-10 md:py-16 lg:py-20">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="w-12 h-3 bg-black/10 rounded animate-pulse" />
            <div className="w-3 h-3 bg-black/10 rounded animate-pulse" />
            <div className="w-16 h-3 bg-black/10 rounded animate-pulse" />
            <div className="w-3 h-3 bg-black/10 rounded animate-pulse" />
            <div className="w-32 h-3 bg-black/10 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-[#f5f2ec] animate-pulse" />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-[#f5f2ec] animate-pulse" />
                ))}
              </div>
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col lg:py-4">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-32 h-4 bg-black/10 rounded animate-pulse" />
              </div>

              {/* Title */}
              <div className="w-3/4 h-10 bg-black/10 rounded mb-5 animate-pulse" />

              {/* Description */}
              <div className="space-y-2 mb-8">
                <div className="w-full h-4 bg-black/10 rounded animate-pulse" />
                <div className="w-full h-4 bg-black/10 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-black/10 rounded animate-pulse" />
              </div>

              {/* Pre-order box */}
              <div className="h-24 rounded-2xl bg-[#3a1f87]/10 mb-8 animate-pulse" />

              {/* Price */}
              <div className="w-32 h-10 bg-black/10 rounded mb-6 animate-pulse" />

              {/* Add to cart */}
              <div className="flex gap-4 mb-10">
                <div className="w-36 h-14 bg-black/10 rounded-full animate-pulse" />
                <div className="flex-1 h-14 bg-[#d40055]/20 rounded-full animate-pulse" />
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-20 bg-white/60 rounded-xl border border-black/5 animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
