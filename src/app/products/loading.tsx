export default function ProductsLoading() {
  return (
    <main className="flex w-full flex-col">
      {/* Header placeholder */}
      <div className="h-[63px] md:h-[81px] bg-[#f5f5f5]" />

      <section className="color-scheme-1 min-h-screen">
        <div className="wrapper--full-padded py-16 md:py-24">
          {/* Header skeleton */}
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-black/10" />
              <div className="w-32 h-4 bg-black/10 rounded animate-pulse" />
              <div className="w-12 h-[1px] bg-black/10" />
            </div>
            <div className="w-80 h-12 bg-black/10 rounded mx-auto mb-6 animate-pulse" />
            <div className="w-96 h-6 bg-black/10 rounded mx-auto animate-pulse" />
          </div>

          {/* Product grid skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                {/* Image skeleton */}
                <div className="aspect-square bg-[#f5f2ec] animate-pulse" />
                {/* Content skeleton */}
                <div className="p-6 md:p-7">
                  <div className="w-3/4 h-6 bg-black/10 rounded mb-3 animate-pulse" />
                  <div className="w-full h-4 bg-black/10 rounded mb-2 animate-pulse" />
                  <div className="w-2/3 h-4 bg-black/10 rounded mb-5 animate-pulse" />
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="w-20 h-6 bg-black/10 rounded animate-pulse" />
                    <div className="w-16 h-4 bg-black/10 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
