export default function WeatherSkeleton() {
  return (
    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.065] p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl shimmer" />
          <div>
            <div className="w-24 h-4 rounded-md shimmer mb-2" />
            <div className="w-16 h-3 rounded-md shimmer" />
          </div>
        </div>
        <div className="w-12 h-6 rounded-lg shimmer" />
      </div>

      {/* Score label row */}
      <div className="flex justify-between mb-1.5">
        <div className="w-20 h-3 rounded shimmer" />
        <div className="w-10 h-3 rounded shimmer" />
      </div>
      {/* Bar */}
      <div className="h-1.5 rounded-full bg-white/[0.06] mb-4 overflow-hidden">
        <div className="h-full w-3/5 rounded-full shimmer" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-2.5 flex flex-col items-center gap-1.5"
          >
            <div className="w-5 h-5 rounded shimmer" />
            <div className="w-10 h-3 rounded shimmer" />
            <div className="w-8 h-2.5 rounded shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}
